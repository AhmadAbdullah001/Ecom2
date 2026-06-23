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

app.use(cors());

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