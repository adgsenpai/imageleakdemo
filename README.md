# Next.js Memory Leak Reproduction

This repository demonstrates a memory leak issue that occurs when running a Next.js application with image optimization enabled in a Docker environment. The application loads and displays a set of images from an external domain. This setup highlights a memory leak issue where the application’s memory usage progressively increases, eventually causing crashes or unresponsiveness.

## Description

The Next.js application in this repository is configured to:

1. **Fetch and display images**: The application loads images from an external domain and displays them on the homepage.
2. **Use Docker**: The application is built and run in a Docker container using a specific Node.js version and Alpine Linux.
3. **Enable image optimization**: The `next.config.js` file is set up to enable image optimization for the specified domain.
4. **Simulate load**: A script is included to repeatedly curl the application endpoint to simulate load and demonstrate the memory leak.

## Prerequisites

- Docker installed on your machine.
- Node.js version 21.1.0 or later.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/adgsenpai/imageleakdemo.git
    cd imageleakdemo
    ```

2. **Create a Dockerfile**:
    ```dockerfile
    FROM node:21.1.0-alpine

    WORKDIR /app

    COPY package*.json ./
    RUN npm install

    COPY . .

    RUN npm run build

    EXPOSE 3000

    CMD ["sh", "-c", "npm start & sh /app/curl-script.sh"]
    ```

3. **Create the curl-script.sh**:
    ```bash
    #!/bin/sh

    # URL to test
    URL="http://localhost:3000"

    # Number of requests to send
    REQUEST_COUNT=10000

    # Send requests in a loop
    for i in $(seq 1 $REQUEST_COUNT)
    do
        curl -s $URL > /dev/null
        echo "Request #$i sent"
    done
    ```

4. **Make the script executable**:
    ```bash
    chmod +x curl-script.sh
    ```

5. **Build and run the Docker container**:
    ```bash
    docker build -t nextjs-memory-leak-demo .
    docker run -p 3000:3000 nextjs-memory-leak-demo
    ```

6. **Access the application**:
    Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Image Optimization Configuration

The `next.config.js` file is configured to allow image optimization for images served from `cdnanimeflix.adgstudios.co.za`:

```javascript
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdnanimeflix.adgstudios.co.za'],
  },
};

module.exports = nextConfig;
