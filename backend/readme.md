# TweetBounty

**TweetBounty** is a decentralized rewards platform inspired by projects like [Sky.money](https://sky.money), offering users Ethereum (ETH) rewards for completing tasks, such as following and posting about your brand on Twitter.

## Project Structure

tweetbounty/ │ ├── backend/ │ └── server.ts │ └── routes/ │ ├── ethRoutes.ts │ ├── userRoutes.ts │ └── tweetRoutes.ts │ └── frontend/ └── src/ ├── App.tsx ├── components/ └── services/


### Frontend

The frontend is built with **ReactJS** and **Tailwind CSS**. It provides an interface for users to connect their wallet and interact with the rewards platform.

#### Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

This will start the frontend server, which is typically hosted on `http://localhost:3000` by default.

### Backend

The backend is powered by **Node.js** and **Express**, with **Supabase** integration for user authentication and storage. It also interacts with the Ethereum blockchain via **ethers.js** to facilitate ETH transfers.

# Migrations

This repository includes a migration system that allows you to manage database changes effectively. The migrations are executed using Supabase and allow for dynamic parameter handling.


#### API Routes

- **/user/find**: Find or register a new user based on their Twitter handle and Ethereum wallet.
- **/tweet**: Endpoint for validating tweet submissions.
- **/send-eth**: Handles ETH reward transfers to users.

#### Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

The backend server will typically run on `http://localhost:5000`.

### Docker Deployment

**TweetBounty** is designed to be containerized for easy deployment. You can build and run the backend and frontend in a Docker environment.

