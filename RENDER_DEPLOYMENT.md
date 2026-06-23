# Render Deployment Guide

## Prerequisites
- GitHub repository with your code pushed
- Render account (https://render.com)
- MongoDB Atlas connection string
- Cloudinary credentials
- Cashfree sandbox or production credentials

## Step 1: Prepare Environment Variables

Get the values for all these variables from your services:

### Database
- `MONGO_URI` - From MongoDB Atlas connection string

### Cloudinary
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Cashfree Payment
- `CASHFREE_APP_ID`
- `CASHFREE_SECRET_KEY`
- `CASHFREE_API_URL` - Use production URL when ready: `https://api.cashfree.com/pg`

### Application Config
- `FRONTEND_URL` - Will be your Render app URL (e.g., `https://your-app.onrender.com`)
- `WEBHOOK_URL` - Will be `https://your-app.onrender.com/api/payment/webhook`
- `NODE_ENV=production`
- `JWT_SECRET` - Generate a strong secret key

## Step 2: Create Web Service on Render

1. **Login to Render Dashboard**: https://dashboard.render.com
2. **Create New Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the branch to deploy (usually `main` or `master`)

3. **Configure Build & Deploy**:
   - **Name**: `your-app-name`
   - **Environment**: `Node`
   - **Build Command**: 
     ```
     npm install && npm run build
     ```
   - **Start Command**: 
     ```
     npm start
     ```
   - **Plan**: Free or Paid (Free plan has limitations)

4. **Add Environment Variables**:
   - Click on "Environment" section
   - Add all variables from Step 1:
     ```
     MONGO_URI = mongodb+srv://...
     CLOUDINARY_CLOUD_NAME = ...
     CLOUDINARY_API_KEY = ...
     CLOUDINARY_API_SECRET = ...
     CASHFREE_APP_ID = ...
     CASHFREE_SECRET_KEY = ...
     CASHFREE_API_URL = ...
     NODE_ENV = production
     JWT_SECRET = [strong random string]
     FRONTEND_URL = https://your-app.onrender.com
     WEBHOOK_URL = https://your-app.onrender.com/api/payment/webhook
     ```

5. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Monitor the deployment in the "Logs" section

## Step 3: Configure Cashfree Webhook (Important!)

1. **Go to Cashfree Dashboard**: https://dashboard.cashfree.com
2. **Navigate to**: Settings → Webhooks
3. **Add Webhook URL**:
   ```
   https://your-app.onrender.com/api/payment/webhook
   ```
4. **Select Events**: Payment success, failure, etc.

## Step 4: Update Frontend Configuration

After deployment, update your frontend API configuration:

1. **Production `.env.example`** (for reference):
   ```
   REACT_APP_HOST=
   ```
   This tells the frontend to use the same origin (Render app URL) for API calls.

2. **For local development**, keep using:
   ```
   REACT_APP_HOST=http://localhost:3002
   ```

## Step 5: Test the Deployment

1. Visit: `https://your-app.onrender.com`
2. Test the full flow:
   - Create account / login
   - Browse products
   - Add to cart and proceed to buy
   - Test COD payment
   - Test Cashfree online payment

## Troubleshooting

### 404 Error on Page Refresh
- This is normal for React Router apps
- Server is configured to serve `index.html` for all routes
- Should work automatically

### CORS Errors
- Check `server/index.js` - CORS is configured to accept your Render URL
- Ensure `FRONTEND_URL` is set correctly in environment variables

### Payment Gateway Issues
- Verify credentials in environment variables
- Check Cashfree dashboard webhook status
- Monitor app logs in Render dashboard

### Database Connection Failed
- Verify `MONGO_URI` is correct
- Check if MongoDB Atlas IP whitelist includes Render's IPs
- MongoDB Atlas → Network Access → Add IP Address `0.0.0.0/0` (or specific Render IPs)

## Important Notes

- **Free Tier**: Render's free tier may take 30 seconds to spin up (cold starts)
- **Production Mode**: Update `CASHFREE_API_URL` to production when ready
- **SSL**: Render automatically provides HTTPS
- **Redeployment**: Push to GitHub → Render auto-deploys (if auto-deploy enabled)

## Updating After Deployment

1. Make changes locally
2. Commit and push to GitHub
3. Render automatically deploys (if you enabled auto-deploy)
4. Check Render logs to verify deployment

## Environment Variable Cheat Sheet

| Variable | Example | Source |
|----------|---------|--------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster...` | MongoDB Atlas |
| `CLOUDINARY_CLOUD_NAME` | `dblktyg0t` | Cloudinary Dashboard |
| `CASHFREE_APP_ID` | `TEST110063...` | Cashfree Dashboard |
| `CASHFREE_SECRET_KEY` | `cfsk_ma_...` | Cashfree Dashboard |
| `JWT_SECRET` | Generate strong random | Your choice |
| `FRONTEND_URL` | `https://your-app.onrender.com` | Your Render app URL |

Good luck! 🚀
