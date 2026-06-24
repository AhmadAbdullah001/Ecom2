const express=require('express')
const user=require('../models/UserSchema')
const  bcrypt=require('bcryptjs')
const router=express.Router()
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')
const upload = require('../middleware/multer')
const cloudinary = require('../config/cloudinary')
const JWT_SECRET=process.env.JWT_SECRET || 'Abdullahisgood$oy'

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

  // Router 4 - Update User Address (Requires login)
  router.post("/updateaddress", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const { street, apartment, city, state, zipcode } = req.body;

      if (!street || !city || !state || !zipcode) {
        return res.status(400).json({ error: "All address fields are required" });
      }

      const address = `${street}${apartment ? ', ' + apartment : ''}, ${city}, ${state} ${zipcode}`;

      const User = await user.findByIdAndUpdate(
        userId,
        { address },
        { new: true }
      ).select("-password");

      res.json(User);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // Router 5 - Update User Profile (name, phone, email)
  router.post("/updateprofile", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phone, email } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (email) {
        const existingUser = await user.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
          return res.status(400).json({ error: "Email already in use" });
        }
        updateData.email = email;
      }

      const User = await user.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
      res.json(User);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // Router 6 - Upload profile avatar image and update user record
  router.post("/uploadavatar", fetchuser, upload.single("avatar"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Avatar file is required" });
      }

      if (!cloudinary.isConfigured()) {
        return res.status(500).json({ error: "Cloudinary is not configured" });
      }

      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "profile_avatars" },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Cloudinary upload failed" });
          }

          const avatarUrl = result.secure_url;
          const userId = req.user.id;
          const User = await user.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true }).select("-password");

          res.json(User);
        }
      );

      const streamifier = require("streamifier");
      streamifier.createReadStream(req.file.buffer).pipe(uploadResult);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Export the router
  module.exports = router;