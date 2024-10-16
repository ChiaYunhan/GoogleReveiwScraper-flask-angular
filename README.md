
# Google Review Scraper Web App

## Tech Stack:
- **Frontend**: Angular 18
- **Backend**: Python, Flask, Selenium, BeautifulSoup
- **Other Tools**: AWS S3 for storing scraped reviews as CSV files

## Description:
This project is a full-stack web application that allows users to scrape Google Maps reviews for any location by inputting the location's Google Maps URL. For example, users can scrape reviews from locations like the [Grand Canyon](https://www.google.com/maps/place/Grand+Canyon+National+Park/@36.0917136,-113.5024596,9z/data=!4m16!1m9!3m8!1s0x873312ae759b4d15:0x1f38a9bec9912029!2sGrand+Canyon+National+Park!8m2!3d36.2678855!4d-112.3535253!9m1!1b1!16zL20vMGNucnI!3m5!1s0x873312ae759b4d15:0x1f38a9bec9912029!8m2!3d36.2678855!4d-112.3535253!16zL20vMGNucnI?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D), fetching up to 300-400 of the most recent reviews.

The application has two primary functionalities:
- **Download Reviews as CSV**: Users can download the scraped reviews as a CSV file directly from the web interface.
- **Upload Reviews to AWS S3**: For users with an AWS account, the app can automatically upload the scraped reviews to a specified S3 bucket. This feature requires additional setup, such as providing AWS credentials. (required, will not function with out this).

Additionally, the application also features a session-based history of scraped data that is displayed on the frontend. This history is cleared on page refresh. Users can view past scrapes during their session and download reviews from S3 via presigned URLs.

![picture of homepage](https://github.com/ChiaYunhan/GoogleReveiwScraper-flask-angular/blob/main/homepage.png?raw=true)
![picture of stored file in s3 bucket](https://github.com/ChiaYunhan/GoogleReveiwScraper-flask-angular/blob/main/s3_bucket.png?raw=true)

## Features:
- **Google Review Scraping**: Scrape up to 310 reviews for a given Google Maps location.
- **CSV Download**: Download the scraped reviews in CSV format directly from the web interface.
- **AWS S3 Integration**: Automatically upload scraped reviews to an AWS S3 bucket for easy access and storage. (Requires AWS setup).
- **Session-Based History**: View and track past scrapes during the current session. Links for downloading CSV files via presigned S3 URLs are generated for each scrape.

## Rate Limiting and IP Blocking:
To avoid triggering Google’s rate limiting or CAPTCHA-based IP bans, this application enforces a limit of scraping up to 310 reviews per location but can be increased by increasing the MAX_SCROLL in google_scraper.py. While scraping a large number of reviews can result in IP-based restrictions, the limited scope of this app minimizes such risks. However, users should be aware that:
- **Rate Limiting**: Google may limit the number of requests per minute, which could slow down the scraping process if too many reviews are requested in quick succession.
- **IP Blocking**: If too many requests are made from the same IP in a short period, Google could trigger CAPTCHA challenges or temporarily block further requests from that IP. It's recommended to use scraping in moderation and avoid aggressive scraping practices.

For a more scalable and reliable approach, consider using APIs like Google Places API for review data, though it comes with stricter usage limits and costs for higher volumes of data.

## Set up
### Prerequisites
- Python: 3.9+
- Node.js: Latest stable version (for Angular frontend).
- AWS Credentials

### Clone the Repository
```bash
git clone https://github.com/ChiaYunhan/GoogleReveiwScraper-flask-angular.git
```
#### Backend
1. Install python libraries:
```bash
pip install -r requirements.txt
```
2. Add to src/backend.sh:
```bash
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key
export S3_BUCKET=your-bucket-name
```
3. Run the Flask backend:
```bash
sh backend.sh
```

#### Frontend
1. Install Node,js dependencies for Angular:
```bash
cd frontend
npm install
```
2. Run teh Angular development server:
```bash
ng serve
```

#### Running the Application:
1. Access Angular frontend at: [http://localhost:4200](http://localhost:4200)
2. Enter a Google Maps location URL into the input field, and click "Scrape" to retrieve the reviews. You can download the results as a CSV or have them automatically uploaded to your S3 bucket.


## Future Improvements
1. Add an option to make the automatic upload to S3 optional, thus not having to set up aws account.
2. Dockerize the application for easier deployment and consistency across environments. :heavy_check_mark:
3. Store scrape history in a persistent database (e.g., PostgreSQL) so that the history persists across sessions.
4. Have it such that S3 bucket names are editable via a form text input.
5. Implement strategies for detecting and solving CAPTCHAs if triggered during scraping.


## References
googlemaps-scraper - https://github.com/gaspa93/googlemaps-scraper

