# Render.com Deployment Guide

## Prerequisites

1. A MongoDB Atlas account with a database cluster set up
2. A Render.com account

## Setup MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient to start)
3. Under Security → Database Access, create a database user with read/write permissions
4. Under Security → Network Access, add an IP address entry allowing access from anywhere (0.0.0.0/0)
5. Under Databases, click "Connect" on your cluster, select "Connect your application", and copy your connection string

## Configure Environment Variables on Render

1. Log in to your Render dashboard
2. Navigate to your service
3. Go to the "Environment" tab
4. Add the following environment variables:
   - `NODE_ENV`: set to `production`
   - `PORT`: set to `10000` (or any port Render allows)
   - `MONGODB_URI`: paste your MongoDB Atlas connection string (replace `<password>` with your database user's password)
   - `JWT_SECRET`: set a secure random string for JWT token signing
   - `JWT_EXPIRE`: set to `30d` (or your preferred expiration time)

## Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure the service:
   - **Name**: green-tech-vault
   - **Runtime**: Node
   - **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
   - **Start Command**: `node server/index.js`
   - **Auto-Deploy**: Enable

4. Add the environment variables as mentioned above
5. Click "Create Web Service"

## Troubleshooting

If you encounter a 503 error:

1. Check the service logs in the Render dashboard
2. Verify that MongoDB connection is working
3. Make sure all required environment variables are set
4. Check that the build and start commands are correct
5. Ensure your MongoDB Atlas IP whitelist includes 0.0.0.0/0 to allow connections from Render

## Manual Deployment

If you prefer to deploy manually:

```bash
# Install dependencies
npm install
cd client
npm install

# Build React frontend
npm run build
cd ..

# Start server
npm start
```

Remember to set up your environment variables locally in a `.env` file for testing. 