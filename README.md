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
git clone https://github.com/yourusername/google-maps-scraping-service.git
cd google-maps-scraping-service
docker-compose up
