const express = require("express");
const router = express.Router();
const Category = require("../models/CategorySchema");
const streamifier = require("streamifier");
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Cloudinary upload timed out"));
    }, 30000);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "categories",
      },
      (error, result) => {
        clearTimeout(timeout);
        if (error) reject(error);
        else resolve(result);
      },
    );

    stream.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });

// Get all categories
router.get("/getcategories", async (req, res) => {
  try {
    console.log("\n📥 GET ALL CATEGORIES REQUEST");
    const categories = await Category.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get category by ID
router.get("/getcategory/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("❌ Error fetching category:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Add new category
router.post("/addcategory", upload.single("image"), async (req, res) => {
  try {
    console.log("\n📥 ADD CATEGORY REQUEST");
    console.log("Body:", JSON.stringify(req.body, null, 2));

    const { name, description, icon } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    const newCategory = new Category({
      name: name.trim(),
      description: description || "",
      icon: icon || "",
      image: imageUrl
    });

    const savedCategory = await newCategory.save();
    console.log("✅ Category saved:", savedCategory._id);

    res.status(201).json({
      message: "Category added successfully",
      category: savedCategory
    });
  } catch (error) {
    console.error("❌ Error adding category:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put("/updatecategory/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("\n📥 UPDATE CATEGORY REQUEST");
    const { name, description, icon } = req.body;

    let updateData = {
      name: name || undefined,
      description: description !== undefined ? description : undefined,
      icon: icon !== undefined ? icon : undefined
    };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      updateData.image = uploadResult.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    console.log("✅ Category updated:", updatedCategory._id);
    res.json({
      message: "Category updated successfully",
      category: updatedCategory
    });
  } catch (error) {
    console.error("❌ Error updating category:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete("/deletecategory/:id", async (req, res) => {
  try {
    console.log("\n📥 DELETE CATEGORY REQUEST");
    
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    console.log("✅ Category deleted:", deletedCategory._id);
    res.json({
      message: "Category deleted successfully",
      category: deletedCategory
    });
  } catch (error) {
    console.error("❌ Error deleting category:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
