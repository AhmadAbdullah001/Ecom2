# 🚀 Deployment Checklist

Before pushing to GitHub and deploying to Render, verify all these items:

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] `.env` file exists in both `/server` and `/client` folders
- [ ] `.env.example` files created (for reference only)
- [ ] `.env` files are in `.gitignore` (CRITICAL - don't commit credentials!)
- [ ] All required variables set in `.env` files (see `.env.example`)

### 2. Code Quality
- [ ] Frontend builds without errors: `npm run build --prefix client`
- [ ] No console errors when running locally
- [ ] Payment flow tested (both COD and Cashfree)
- [ ] Address functionality working

### 3. Git Repository
- [ ] Repository initialized: `git init`
- [ ] Remote added: `git remote add origin https://github.com/yourusername/repo.git`
- [ ] `.gitignore` includes `.env` files
- [ ] No large files or node_modules committed

### 4. MongoDB Atlas
- [ ] Database created and connection string obtained
- [ ] IP whitelist updated to allow Render (add `0.0.0.0/0` temporarily or specific Render IPs)
- [ ] Connection string in `server/.env` as `MONGO_URI`

### 5. Cloudinary Setup (if using image uploads)
- [ ] Account created and credentials obtained
- [ ] Cloud name, API key, API secret in `server/.env`

### 6. Cashfree Setup
- [ ] Sandbox account created and tested (DONE ✓)
- [ ] Credentials in `server/.env`: `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`
- [ ] API URL set correctly for sandbox/production

---

## 📋 Push to GitHub

### Step 1: Remove .env from Git History (if already committed)

```powershell
# Remove .env files from git tracking (but keep locally)
git rm --cached server/.env client/.env
git rm --cached server/.env client/.env 2>$null

# Create commit
git add .gitignore
git commit -m "Remove sensitive .env files from git tracking"
```

### Step 2: Prepare Repository

```powershell
# Stage all changes except .env
git add -A
git status  # Verify .env files are NOT staged

# Commit
git commit -m "Prepare for Render deployment: update config, add environment templates"
```

### Step 3: Push to GitHub

```powershell
# Push to main branch
git push -u origin main
# OR
git push -u origin master
```

---

## 🎯 Deploy to Render

### Step 1: Create Render Service

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect Repository**: Select your GitHub repo
4. **Select Branch**: Usually `main` or `master`

### Step 2: Configure Build Settings

```
Name: ecom-app (or your preferred name)
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
Plan: Free (or upgrade if needed)
```

### Step 3: Add Environment Variables

In the Render dashboard, add these variables under "Environment":

```
MONGO_URI=<your-mongodb-atlas-uri>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
CASHFREE_APP_ID=<your-cashfree-app-id>
CASHFREE_SECRET_KEY=<your-cashfree-secret-key>
CASHFREE_API_URL=https://sandbox.cashfree.com/pg
NODE_ENV=production
JWT_SECRET=<generate-strong-random-key>
FRONTEND_URL=<your-render-app-url>
WEBHOOK_URL=<your-render-app-url>/api/payment/webhook
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will start building and deploying
3. Check logs to verify no errors
4. Once deployed, you'll get a live URL

### Step 5: Update Cashfree Webhook

1. Go to: https://dashboard.cashfree.com
2. Settings → Webhooks
3. Add webhook URL:
   ```
   https://your-render-app.onrender.com/api/payment/webhook
   ```

---

## ✨ Post-Deployment

### Testing

1. Visit your live app: `https://your-render-app.onrender.com`
2. Test full flow:
   - ✓ Signup / Login
   - ✓ Browse products
   - ✓ Add to cart
   - ✓ Checkout with address
   - ✓ COD payment
   - ✓ Cashfree payment (if configured)

### Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 on page refresh | Normal for React apps - server handles it |
| CORS errors | Check CORS config in `server/index.js` and `FRONTEND_URL` env var |
| Payment fails | Verify Cashfree credentials and webhook URL |
| Database connection fails | Check `MONGO_URI` and MongoDB IP whitelist |
| App takes 30sec to load | Free tier cold start - upgrade for faster response |

---

## 📝 Important Files Modified for Deployment

- `.gitignore` - Now excludes `.env` files
- `server/index.js` - Dynamic CORS configuration
- `client/src/config/index.js` - API host configuration
- `package.json` - Added `dev` script
- `server/.env.example` - Template for environment variables
- `client/.env.example` - Template for client environment
- `RENDER_DEPLOYMENT.md` - Detailed deployment guide

---

## 🔐 Security Reminders

✋ **NEVER** commit `.env` files to GitHub  
✋ **NEVER** share your secret keys or credentials  
✋ **ALWAYS** use `.env.example` as template  
✋ **VERIFY** `.gitignore` has `.env` before pushing  

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Cashfree Docs**: https://docs.cashfree.com
- **React Router**: https://reactrouter.com

Good luck with your deployment! 🚀
