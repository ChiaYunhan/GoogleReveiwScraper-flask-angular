# Google Maps Scraping Service in Docker

This project is a web scraping service for scraping Google Maps reviews using Selenium and Flask as the backend, and an Angular frontend. The application runs in Docker containers.

## Features
- Scrapes reviews from Google Maps URLs.
- Downloads scraped reviews as CSV files.
- Supports uploading scraped data to AWS S3.
- Runs Chrome in headless mode using Selenium.
- Angular frontend to submit Google Maps URLs for scraping and download CSVs.

## Tech Stack
- **Backend**: Flask, Selenium (headless Chrome), WebDriver Manager.
- **Frontend**: Angular.
- **Database**: No database (scraped data stored in session or directly uploaded to S3).
- **Deployment**: Docker, Docker Compose.

## Prerequisites
Before running the project, make sure you have the following installed:

- Docker
- Docker Compose
- Python 3.9+
- Node.js 
- AWS account

## Setup
### Clone the Repository

```bash
git clone https://github.com/ChiaYunhan/google-maps-scraping-service.git
cd google-maps-scraping-service
```

### Create .env file in root directory
```bash
AWS_ACCESS_KEY=key-from-aws
AWS_SECRET_KEY=key-from-aws
AWS_BUCKET=your-bucket-name

FLASK_APP=app
FLASK_ENV=development
```

### run
```bash
docker-compose up
```

## Current issues
1. An unhandled exception occurred: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
   - **Workaround Attempts**: I have applied fixes from this GitHub discussion, which have worked intermittently. However, after a period of time, the issue resurfaced without further changes to the codebase.
   - **Action Taken**: The repository currently reflects the most stable configuration found at the time of publishing, but the solution remains inconsistent across builds and environments.

## Further work
1. changed that s3 bucket is not hardcoded into .env file, instead a form input of sorts that users can change easily.
