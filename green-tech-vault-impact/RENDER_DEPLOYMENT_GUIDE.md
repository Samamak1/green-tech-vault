# Render Deployment Guide

## Understanding and Fixing 503 Errors

If you're seeing a "HTTP ERROR 503" message when visiting your Render-hosted application, this is likely because the free tier instance has spun down due to inactivity. Free tier instances on Render automatically spin down after 15 minutes of inactivity to conserve resources.

### Why This Happens

When a new request comes in after the service has spun down, Render needs to spin up the service again, which can take 30-50+ seconds. During this time, visitors may see a 503 error.

### Solutions

#### 1. Wait For Initial Spin-Up

When you first visit the site after a period of inactivity, simply wait about 30-60 seconds and then refresh the page. The service should have spun up by then.

#### 2. Run the Keep-Alive Script

We've created a `keep-alive.js` script that will ping the service every 14 minutes to prevent it from spinning down. To use it:

```bash
# Run this in a terminal that will stay open (like on your development machine)
npm run keep-alive
```

#### 3. Upgrade to a Paid Plan

The most reliable solution is to upgrade to a paid plan on Render, which keeps your service running constantly without spinning down.

## Understanding the Improved Server Configuration

We've made several improvements to handle the spin-up/spin-down cycle better:

1. Added a `/wakeup` endpoint that responds quickly even when the service is starting
2. Added server readiness tracking to provide better status information
3. Improved error handling for database connection issues
4. Added a healthcheck configuration in `render.yaml`

## Deploying Updates

When you make changes to your code:

1. Commit your changes to Git
2. Push to your GitHub repository
3. Render will automatically detect the changes and redeploy your application

## Monitoring Your Application

You can monitor your application's status and logs from the Render dashboard:

1. Log in to your Render account
2. Navigate to your service (green-tech-vault)
3. Click on "Logs" to see application logs
4. Click on "Events" to see deployment events

## Troubleshooting

If you continue to experience issues:

1. Check the Render logs for any specific error messages
2. Verify that your MongoDB connection is working properly
3. Make sure the application is properly configured for production
4. Try manually redeploying from the Render dashboard

Remember that on the free tier, slow initial responses are expected behavior - this is a limitation of the free plan, not an issue with your application. 