
# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /backend/src

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    unzip \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libxss1 \
    libappindicator3-1 \
    fonts-liberation \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Download and install Chromium manually
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

# Copy the requirements file into the container
COPY src/requirements.txt .

# Install any Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY src/ .

# Expose the Flask app port
EXPOSE 5000

# Set environment variables (adjust if needed)
ENV FLASK_APP=app
ENV FLASK_ENV=development

# Command to run the Flask app
CMD ["flask", "run", "--host", "0.0.0.0"]
