const express = require("express");
const router = express.Router();
const product = require("../models/ProductSchema");
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
        folder: "products",
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

router.post("/addproduct", upload.array("images", 6), async (req, res) => {
  try {
    const { head, title, price, categoryId } = req.body;
      
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }    
    
    // Safe JSON parsing
    let detail = [];
    try {
      detail = typeof req.body.detail === 'string' 
        ? JSON.parse(req.body.detail) 
        : (Array.isArray(req.body.detail) ? req.body.detail : []);
    } catch (e) {
      detail = [];
    }
    
    let productDetails = {};
    try {
      productDetails = typeof req.body.productDetails === 'string'
        ? JSON.parse(req.body.productDetails)
        : (typeof req.body.productDetails === 'object' ? req.body.productDetails : {});
    } catch (e) {
      productDetails = {};
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one product image is required" });
    }

    const uploadResults = await Promise.all(req.files.map(uploadToCloudinary));
    const imgurl = uploadResults.map((result) => result.secure_url);
    
    const newproduct = new product({
      category: categoryId,
      categoryName: category.name,
      imgurl,
      head,
      title,
      price,
      detail,
      productDetails: {
        Material: productDetails.Material || "",
        Country: productDetails.Country || "",
      },
    });
    
    const savedProduct = await newproduct.save();
    const verifiedProduct = await product.findById(savedProduct._id);

    res.status(201).json({
      message: "Product added successfully",
      productId: savedProduct._id.toString(),
      verifiedInDb: !!verifiedProduct,
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});
router.get("/fetchproducts", async (req, res) => {
  try {
    console.log('[Product API] Fetching all products...');
    const list = await product.find();
    console.log('[Product API] Found', list.length, 'products');
    
    if (list.length === 0) {
      console.warn('[Product API] No products in database');
    } else {
      // Log first product to verify structure
      const firstProduct = list[0];
      console.log('[Product API] First product:', {
        id: firstProduct._id,
        title: firstProduct.title,
        imgurl: firstProduct.imgurl ? firstProduct.imgurl.length + ' images' : 'no images',
        price: firstProduct.price
      });
    }
    
    res.json(list);
  } catch (error) {
    console.error('[Product API] Error fetching products:', error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").trim();
    if (!query) {
      return res.json([]);
    }

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeQuery, "i");

    const results = await product
      .find({
        $or: [
          { title: regex },
          { head: regex },
          { categoryName: regex },
        ],
      })
      .limit(3);

    res.json(results);
  } catch (error) {
    console.error('[Product API] Search error:', error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/fetchhomeproducts", async (req, res) => {
  try {
    const list = await product.find();
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fetchproductsbycategory/:categoryId", async (req, res) => {
  try {
    const list = await product.find({ category: req.params.categoryId }).populate('category');
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
