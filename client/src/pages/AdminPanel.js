import React, { useContext, useState, useEffect } from "react";
import itemContext from "../context/Context";
import "../styles/adminpanel.css";

function AdminPanel() {
  const { addproduct, addCategory, getCategories } = useContext(itemContext);
  const [activeTab, setActiveTab] = useState("category"); // category, product, view
  
  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    categoryImage: null,
  });

  // Product Form State
  const [productForm, setProductForm] = useState({
    categoryId: "",
    head: "",
    title: "",
    price: "",
    details: [],
    images: [],
    country: "",
    material: "",
  });

  const [detailInput, setDetailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCats();
  }, [getCategories]);

  // ===== CATEGORY FORM HANDLERS =====
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({
      ...categoryForm,
      [name]: value,
    });
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryForm({
        ...categoryForm,
        categoryImage: file,
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!categoryForm.name.trim()) {
      setMessage("Category name is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", categoryForm.name);
      payload.append("description", categoryForm.description);
      
      if (categoryForm.categoryImage) {
        payload.append("image", categoryForm.categoryImage);
      }

      const data = await addCategory(payload);

      if (data.error) {
        setMessage(data.error);
        setMessageType("error");
      } else {
        setMessage(`✅ Category "${categoryForm.name}" added successfully!`);
        setMessageType("success");
        setCategoryForm({
          name: "",
          description: "",
          categoryImage: null,
        });
        // Refresh categories list
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding category: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ===== PRODUCT FORM HANDLERS =====
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const addDetail = () => {
    if (detailInput.trim()) {
      setProductForm({
        ...productForm,
        details: [...productForm.details, detailInput],
      });
      setDetailInput("");
    }
  };

  const removeDetail = (index) => {
    setProductForm({
      ...productForm,
      details: productForm.details.filter((_, i) => i !== index),
    });
  };

  const addImage = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProductForm({
        ...productForm,
        images: [...productForm.images, file],
      });
    }

    e.target.value = "";
  };

  const removeImage = (index) => {
    setProductForm({
      ...productForm,
      images: productForm.images.filter((_, i) => i !== index),
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const detailsToSubmit = detailInput.trim()
      ? [...productForm.details, detailInput.trim()]
      : productForm.details;

    const missingFields = [];
    if (!productForm.categoryId) missingFields.push("category");
    if (!productForm.head.trim()) missingFields.push("product name");
    if (!productForm.title.trim()) missingFields.push("description");
    if (!productForm.price.trim()) missingFields.push("price");
    if (detailsToSubmit.length === 0) missingFields.push("at least one detail");
    if (productForm.images.length === 0) missingFields.push("at least one image");
    if (!productForm.country.trim()) missingFields.push("country");
    if (!productForm.material.trim()) missingFields.push("material");

    // Validation
    if (missingFields.length > 0) {
      setMessage(`Please add: ${missingFields.join(", ")}`);
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("categoryId", productForm.categoryId);
      payload.append("head", productForm.head.trim());
      payload.append("title", productForm.title.trim());
      payload.append("price", productForm.price.trim());
      payload.append("detail", JSON.stringify(detailsToSubmit));
      payload.append(
        "productDetails",
        JSON.stringify({
          Material: productForm.material.trim(),
          Country: productForm.country.trim(),
        }),
      );

      productForm.images.forEach((image) => {
        payload.append("images", image);
      });

      const data = await addproduct(payload);

      if (data.error) {
        setMessage(data.error);
        setMessageType("error");
      } else {
        setMessage(`Product "${productForm.head}" added successfully!`);
        setMessageType("success");
        // Reset form
        setProductForm({
          categoryId: "",
          head: "",
          title: "",
          price: "",
          details: [],
          images: [],
          country: "",
          material: "",
        });
        setDetailInput("");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding product: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Admin Panel</h1>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
            <button
              className="close-message"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "category" ? "active" : ""}`}
            onClick={() => setActiveTab("category")}
          >
            Add Category
          </button>
          <button
            className={`tab-button ${activeTab === "product" ? "active" : ""}`}
            onClick={() => setActiveTab("product")}
          >
            Add Product
          </button>
          <button
            className={`tab-button ${activeTab === "view" ? "active" : ""}`}
            onClick={() => setActiveTab("view")}
          >
            View Categories
          </button>
        </div>

        {/* TAB 1: ADD CATEGORY */}
        {activeTab === "category" && (
          <form onSubmit={handleAddCategory} className="admin-form">
            <section className="form-section">
              <h2>Add New Category</h2>

              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Graphics Cards, Monitors, RAM"
                  value={categoryForm.name}
                  onChange={handleCategoryInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter category description"
                  rows="4"
                  value={categoryForm.description}
                  onChange={handleCategoryInputChange}
                />
              </div>

              <div className="form-group">
                <label>Category Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCategoryImageChange}
                  required
                />
                {categoryForm.categoryImage && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(categoryForm.categoryImage)}
                      alt="Category Preview"
                    />
                    <span>{categoryForm.categoryImage.name}</span>
                  </div>
                )}
              </div>
            </section>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Adding Category..." : "Add Category"}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: ADD PRODUCT */}
        {activeTab === "product" && (
          <form onSubmit={handleAddProduct} className="admin-form">
            <section className="form-section">
              <h2>Product Information</h2>

              <div className="form-group">
                <label>Select Category *</label>
                <select
                  name="categoryId"
                  value={productForm.categoryId}
                  onChange={handleProductInputChange}
                  required
                >
                  <option value="">-- Choose a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="head"
                  placeholder="e.g., Mechanical Keyboard"
                  value={productForm.head}
                  onChange={handleProductInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Description *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Redragon K552 Mechanical Gaming Keyboard..."
                  value={productForm.title}
                  onChange={handleProductInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price *</label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g., $999.99"
                  value={productForm.price}
                  onChange={handleProductInputChange}
                  required
                />
              </div>
            </section>

            <section className="form-section">
              <h2>Product Details</h2>

              <div className="form-group">
                <label>Add Product Details</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    placeholder="e.g., 16GB RAM, 512GB SSD"
                    value={detailInput}
                    onChange={(e) => setDetailInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDetail();
                      }
                    }}
                  />
                  <button type="button" onClick={addDetail} className="add-btn">
                    Add Detail
                  </button>
                </div>

                {productForm.details.length > 0 && (
                  <div className="items-list">
                    {productForm.details.map((detail, index) => (
                      <div key={index} className="item-tag">
                        <span>{detail}</span>
                        <button
                          type="button"
                          onClick={() => removeDetail(index)}
                          className="remove-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country of Origin *</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="e.g., USA, China"
                    value={productForm.country}
                    onChange={handleProductInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Material *</label>
                  <input
                    type="text"
                    name="material"
                    placeholder="e.g., Aluminum, Plastic"
                    value={productForm.material}
                    onChange={handleProductInputChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Product Images</h2>

              <div className="form-group">
                <label>Upload Product Images One By One</label>
                <div className="input-with-button file-input-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={addImage}
                  />
                </div>

                {productForm.images.length > 0 && (
                  <div className="images-container">
                    {productForm.images.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                        />
                        <span className="image-name">{image.name}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: VIEW CATEGORIES */}
        {activeTab === "view" && (
          <section className="form-section">
            <h2>Available Categories</h2>
            {categories.length === 0 ? (
              <p style={{ textAlign: "center", padding: "20px" }}>
                No categories found. Create one in the "Add Category" tab.
              </p>
            ) : (
              <div className="categories-grid">
                {categories.map((cat) => (
                  <div key={cat._id} className="category-card">
                    {cat.image && (
                      <img src={cat.image} alt={cat.name} className="category-image" />
                    )}
                    <h3>{cat.name}</h3>
                    {cat.description && <p>{cat.description}</p>}
                    <small>ID: {cat._id}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
