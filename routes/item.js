const express = require('express');
const router = express.Router();
const Item = require('../models/ItemSchema');
const fetchuser = require('../middleware/fetchuser');

// Router to Get all the Items
router.get('/fetchitems', fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    console.log("This is Id", id)
    const items = await Item.find({ user: req.user.id });
    res.json({ id, items }); // Sends `id` and `items` as a single object
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Router to POST Items
router.post('/additems', fetchuser, async (req, res) => {
  const { imageURI, title, price } = req.body;
  var flag = 1;

  // Validate input fields
  if (!imageURI) return res.status(400).json({ error: "Image URL is required" });
  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!price) return res.status(400).json({ error: "Price is required" });

  try {
    const search = await Item.findOne({title,user:req.user.id});
    if (search) {
      return res.json(flag); // Return here to stop further execution
    }

    const item = new Item({
      imageURI,
      title,
      price,
      user: req.user.id,
    });

    await item.save();
    flag = 2;
    res.json(flag);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Router to Delete Items
// Router to Delete Items
router.delete('/deleteitems/:id', fetchuser, async (req, res) => {
    try {
      // Find the item to be deleted
      let item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      // Check if the user is authorized to delete the item
      if (item.user && item.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not authorized" });
      }
  
      // Delete the item
      await Item.findByIdAndDelete(req.params.id);
      res.json({ success: "Item has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
module.exports = router;
