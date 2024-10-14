
# Google Review Scraper Web App

## Tech Stack:
- **Frontend**: Angular18
- **Backend**: Python, Flask, Selenium, BeautifulSoup

## Description:
This project is a full-stack learning exercise that demonstrates the creation of a simple web application. The app allows users to input a Google Maps URL of a place, such as the [Grand Canyon](https://www.google.com/maps/place/Grand+Canyon+National+Park/@36.0917136,-113.5024596,9z/data=!4m16!1m9!3m8!1s0x873312ae759b4d15:0x1f38a9bec9912029!2sGrand+Canyon+National+Park!8m2!3d36.2678855!4d-112.3535253!9m1!1b1!16zL20vMGNucnI!3m5!1s0x873312ae759b4d15:0x1f38a9bec9912029!8m2!3d36.2678855!4d-112.3535253!16zL20vMGNucnI?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D), and retrieve the latest 300-400 reviews. This limit is set to avoid issues like rate-limiting or IP banning by Google.

Users can either:
- **Download** the reviews as a CSV file from the web interface, or
- **Automatically upload** the reviews to their preferred AWS S3 bucket. (Requires additional setup for service accounts.)

Additionally, a table on the webpage stores the history of reviews scraped during the current session (cleared on refresh). Users can view details of past scrapes and download CSV files from their S3 bucket via presigned URLs.

![picture of homepage](https://github.com/ChiaYunhan/GoogleReveiwScraper-flask-angular/blob/main/homepage.png?raw=true)

## Features:
- Scrape and download up to 400 Google reviews for a given location.
- Session-based history of past scrapes, with download links for CSV files.
- automatically uploads to your own AWS S3 bucket.

## Future Improvements:
1. Add an option to make the automatic upload to S3 optional, thus not having to set up aws account.
2. Dockerize the application for easier deployment. :heavy_check_mark:
3. Have scrape history stored to a database such that information persists over to new sessions.
4. Have it such that S3 bucket names are editable via a form text input.

