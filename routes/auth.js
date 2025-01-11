const express=require('express')
const user=require('../models/UserSchema')
const  bcrypt=require('bcryptjs')
const router=express.Router()
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='Abdullahisgood$oy'

//For Signup
router.post('/signup',async(req,res)=>{
  var flag=1;
    const {name,email,phone,password,address}=req.body
    if(!email)
      return res.status(404).json({error:"Email required"})
    if(!name)
      return res.status(404).json({error:"Name required"})
    if(!phone)
      return res.status(404).json({error:"Phone required"})
    if(!password)
      return res.status(404).json({error:"Password required"})
    if(!address)
      return res.status(404).json({error:"Address required"})
    const existing=await user.findOne({email})
    if(existing)return res.json({flag})
      else flag=2
    const salt=await bcrypt.genSalt(10)
    const newpass=await bcrypt.hash(password,salt)
    const User=new user({
        name,email,phone,password:newpass,address
    })
    
    try {
        await User.save();
        // Generate JWT token after successful signup
        const data = {
          user: {
            id: User.id
          }
        };
    
        const authToken = jwt.sign(data, JWT_SECRET); // Token expires in 1 hour
        res.json({authToken,flag});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})
router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    var flag=false;
    if(!email)return res.status(404).json({error:"Email required"})
    if(!password)return res.status(404).json({error:"Password required"})
    const exist=await user.findOne({email})
    if(!exist)return res.status(400).json({error:"Account Doesn't Exist"})
    const match=await bcrypt.compare(password,exist.password)
    if(!match)return res.status(400).json({error:"Invalid Credentials"})
        flag=true;
      const data={
        user:{
          id:exist.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({flag,authToken})

})
// Router 3 - Get Logged-in User Details (Requires login)
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      // Extract user ID from JWT token (added by fetchuser middleware)
      const userId = req.user.id;
  
      // Fetch user details from the database, excluding the password
      const User = await user.findById(userId).select("-password");
  
      res.json(User);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Export the router
  module.exports = router;