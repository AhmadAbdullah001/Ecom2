require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const connectToMongo = require('./config/db');
const path = require('path');
const express = require('express');
const cors = require('cors');

console.log("Environment Variables Loaded:");
console.log("  CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Set" : "❌ Not set");
console.log("  CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Not set");
console.log("  CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Not set");

connectToMongo();

const app = express();
const port = process.env.PORT || 3002;

// CORS configuration for development and production
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3002',
  process.env.FRONTEND_URL
].filter(Boolean).map(url => url.replace(/\/$/, '')); // Remove trailing slashes

// In production, same-origin requests don't need CORS (no Origin header)
// In development, we allow specific origins
app.use(cors({
  origin: function(origin, callback) {
    // No origin header = same-origin request (production on Render) - always allow
    if (!origin) {
      console.log('[CORS] ✅ Same-origin request - allowed');
      callback(null, true);
      return;
    }
    
    // Normalize origin by removing trailing slash
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    // Check if origin is allowed (with normalization)
    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log('[CORS] ✅ Allowed origin:', origin);
      callback(null, true);
    } else {
      console.warn('[CORS] ❌ Blocked origin:', origin, '(normalized:', normalizedOrigin + ')');
      console.warn('[CORS] Allowed origins:', allowedOrigins);
      callback(null, true); // Allow anyway for development - log but don't block
    }
  },
  credentials: true
}));

// Only parse JSON for non-multipart requests
app.use(express.json({ 
  type: ['application/json'],
  limit: '50mb'
}));

app.use(express.urlencoded({ 
  limit: '50mb', 
  extended: true 
}));

// Global request logging
app.use((req, res, next) => {
  console.log(`\n📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("  Content-Type:", req.get('Content-Type'));
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/item'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/review', require('./routes/review'));
app.use('/api/category', require('./routes/category'));
app.use('/api/product', require('./routes/product'));
app.use('/api/payment', require('./routes/payment'));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => {
    console.log("Ecom Listenting", port);
});


