

# TweetBounty

TweetBounty is a web application that allows users to verify and scrape tweets from [X.com](https://x.com) (formerly Twitter) using Puppeteer and Playwright. This project is built using **Next.js** with both server-side and client-side functionalities, and deployed using Docker.


## Docker Image

The Docker image for this project is available on Docker Hub:

```text
docker.io/blackstardocker/tweetbounty:latest
```


## Deployment

The application is deployed at the following address:

```text
https://tweetbounty.onrender.com
```


## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Building and Running with Docker](#building-and-running-with-docker)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)


## Project Summary

TweetBounty enables users to scrape tweet content from X.com and verify its authenticity or relevance based on keywords. The project integrates with Web3 wallets for verification, using **wagmi** and **rainbowkit** libraries for wallet interactions. It is built with Next.js for full-stack capabilities and is containerized using Docker for easy deployment.


## Features

- Scrape tweets from X.com using Playwright.
- Verify tweet content against user-defined keywords.
- Support for Web3 wallet integration (via **wagmi** and **rainbowkit**).
- Responsive UI built with **React** and **Next.js**.
- Dockerized for easy deployment.


## Requirements

- **Node.js** v16.x or higher
- **Docker** (if you want to build and deploy using Docker)
- **Web3** wallet for interaction (if using wagmi or RainbowKit features)


## Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/msadiqraza/tweetbounty-nextjs.git
    cd tweetbounty
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the necessary environment variables (see the next section).


## Environment Variables

To run the project locally, you need to create a `.env` file in the root directory of the project with the following variables:

```env
INFURA_PROJECT_ID=https://sepolia.infura.io/v3/project_id
SUPABASE_URL=https://__url__.supabase.co
SUPABASE_PUBLIC_KEY=public_key

```


## Building and Running with Docker


### Building the Docker Image

If you prefer to build and run the application using Docker, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t your-dockerhub-username/tweetbounty .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 3000:3000 your-dockerhub-username/tweetbounty
    ```


### Using Docker Compose (Optional)

If you prefer to use Docker Compose, you can set it up using the `docker-compose.yml` provided:

1. Build and run the container using Docker Compose:

    ```bash
    docker-compose up --build
    ```


## API Endpoints


### GET `/api/tweet`

Fetches and scrapes tweets from X.com.

**Parameters**:
- `message` (string): The URL or message containing the tweet to scrape.

**Example**:

```bash
GET /api/tweet?message=https://x.com/someuser/status/123456789
```


### GET `/api/user`

Verifies the content of the tweet against a given keyword.

**Parameters**:
- `user` (string): The URL of the tweet to verify.
- `wallet` (string): The wallet address for verification purposes.

**Example**:

```bash
GET /api/user?user='...'&&wallet='0x...'
```


### POST `/api/sendeth`

Sends 0.01SepoliaETH transaction to the connected account.

**Example**:

```bash
POST /api/sendeth
```


## Deployment

You can deploy this Dockerized application to cloud services like **Render**, **AWS**, **DigitalOcean**, or **Azure**. Here's an example of deploying on [Render](https://render.com):

1. Push your Docker image to Docker Hub:

    ```bash
    docker push blackstardocker/tweetbounty:latest
    ```

2. Log into Render and create a new **Web Service**.
3. In the **Deploy from Docker** section, enter your Docker Hub image URL:

    ```text
    blackstardocker/tweetbounty:latest
    ```

4. Set the appropriate environment variables.
5. Deploy the application.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
