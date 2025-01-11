const connectToMongo=require('./db')
const express=require('express')
connectToMongo();
const app=express();
const port=process.env.PORT ||3000;
var cors=require('cors')
app.use(cors())
app.use(express.json())
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/item'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/review', require('./routes/review'));
app.use('/api/product', require('./routes/Product'));
app.listen(port,()=>{
    console.log("Ecom Listenting",port)
})