from flask import Flask, session, request, jsonify, Response
from flask_session import Session
from flask_cors import CORS
from io import StringIO, BytesIO
from .google_scraper import GoogleScraper
from datetime import datetime
from dotenv import load_dotenv, find_dotenv
import re
import boto3
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "aaa"  # Needed for session management

# Configure Flask to use server-side session storage (filesystem)
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_FILE_DIR"] = (
    "/tmp/flask_sessions"  # Specify directory for session files
)
Session(app)

load_dotenv(find_dotenv())
AWS_ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")
AWS_BUCKET = os.environ.get("AWS_BUCKET")


def _upload_s3(location_name: str, scraped_at_date: str, scraped_at_time: str):
    # Generate a default CSV name with a timestamp and location name
    default_name = f"{scraped_at_date}_{scraped_at_time}_{location_name}.csv"
    csv_name = request.args.get("csv_name") or default_name
    csv_data = session.get("csv_data")

    # Initialize the S3 client (using environment variables or IAM role for credentials)
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
    )

    # Convert CSV string data into an in-memory file-like object using BytesIO
    csv_buffer = BytesIO(csv_data.encode("utf-8"))

    object_key = csv_name  # This will be the file name in S3

    try:
        # Upload the file to S3
        s3_client.upload_fileobj(csv_buffer, AWS_BUCKET, object_key)
        return jsonify(
            {"message": f"File uploaded successfully to S3 as {object_key}."}
        )
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return jsonify({"error": str(e)})


@app.route("/scrape", methods=["POST"])
def scrape():
    session.pop("csv_data", None)
    data = request.json
    googleMapUrl = data.get("googleMapUrl")
    scrape_at_datetime = datetime.now()
    scraped_at_date = scrape_at_datetime.strftime("%Y%m%d")  # Format date as 'YYYYMMDD'
    scraped_at_time = scrape_at_datetime.strftime("%H%M%S")  # Format time as 'HHMMSS'

    if not googleMapUrl:  # shouldnt be possible since button is disabled when empty
        return jsonify(
            {
                "success": "false",
                "scraped_at_date": scraped_at_date,
                "scraped_at_time": scraped_at_time,
                "location_name": "",
                "url": "",
                "reviews_count": 0,
                "message": "No google map URL provided.",
                "s3_url": "",
            }
        )

    # Extract location name using regex
    location_name_match = re.search(r"place/([^\/]+)/@", googleMapUrl)
    location_name = (
        location_name_match.group(1).replace("+", "_") if location_name_match else None
    )

    scraper = GoogleScraper()

    try:
        # Scrape reviews and store in session
        df = scraper.scrape_reviews(googleMapUrl)

        # Convert DataFrame to CSV and store it in session
        csv_buffer = StringIO()

        df.to_csv(csv_buffer, index=False)
        session["csv_data"] = csv_buffer.getvalue()

        # Ensure session knows it has been modified
        session.modified = True

        _upload_s3(location_name, scraped_at_date, scraped_at_time)

        return (
            jsonify(
                {
                    "success": "true",
                    "scraped_at_date": scraped_at_date,
                    "scraped_at_time": scraped_at_time,
                    "location_name": location_name,
                    "url": googleMapUrl,
                    "reviews_count": len(df),
                    "message": "Reviews scraped successfully. You may download as CSV.",
                }
            ),
            200,
        )
    except Exception as e:
        print(f"Error during scraping: {e}")
        return jsonify(
            {
                "success": "false",
                "scraped_at_date": scraped_at_date,
                "scraped_at_time": scraped_at_time,
                "location_name": "",
                "url": "",
                "reviews_count": 0,
                "message": f"Error: {e}",
            }
        )


@app.route("/download", methods=["GET"])
def download_csv():
    csv_name = request.args.get("csv_name")
    csv_data = session.get("csv_data")

    if not csv_data:
        return "No CSV data available. Please scrape first."

    return Response(
        csv_data,
        mimetype="text/csv",
        headers={"Content-disposition": f"attachment; filename={csv_name}.csv"},
    )


@app.route("/generate-presigned-url", methods=["GET"])
def generate_presigned_url():
    object_key = request.args.get("file_key")
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
    )

    try:
        presigned_url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": AWS_BUCKET, "Key": object_key},
            ExpiresIn=10,
        )

        return jsonify({"presigned_url": presigned_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
