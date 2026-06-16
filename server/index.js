const connectToMongo = require('./config/db');
const path = require('path');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/item'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/review', require('./routes/review'));
app.use('/api/product', require('./routes/product'));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => {
    console.log("Ecom Listenting", port);
});