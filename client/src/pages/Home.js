import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import itemContext from "../context/Context";
import { normalizeImageSrc } from "../utils/images";
import { normalizeCategoryName, productMatchesCategory } from "../utils/categories";
import "../styles/home.css";

function Home(props) {
  const nav = useNavigate();
  const context = useContext(itemContext);
  const { addtocart, fetchproducts, getCategories } = context;
  const [items, setItems] = useState([]);

  const goToDetails = (item) => {
    nav("/itemdetails", { state: item });
  };

  const getProductArray = useCallback(async () => {
    try {
      console.log('[Home] Fetching products...');
      const [temp, categories] = await Promise.all([fetchproducts(), getCategories()]);
      
      console.log('[Home] Got products:', temp?.length || 0);
      console.log('[Home] Got categories:', categories?.length || 0);
      
      if (categories && categories.length > 0) {
        console.log('[Home] Available categories:', categories.map(c => c.name));
      }
      
      const productArray = Array.isArray(temp) ? temp.filter(Boolean) : [];
      console.log('[Home] Total valid products:', productArray.length);

      // Show all products on home page (no category filter)
      // This ensures products display even if category system hasn't been set up
      if (productArray.length > 0) {
        console.log('[Home] Displaying all', productArray.length, 'products');
        setItems(productArray);
      } else {
        console.warn('[Home] No products found in database');
        setItems([]);
      }
    } catch (err) {
      console.error('[Home] Error loading products:', err);
      props.showalert?.('Error loading products: ' + err.message, 'danger');
      setItems([]);
    }
  }, [fetchproducts, getCategories, props]);

  useEffect(() => {
    getProductArray();
  }, [getProductArray]);

  const addItem = (item) => {
    addtocart(item);
  };

  const getProductImage = (item) => {
    try {
      if (!item) {
        console.warn('[Home Image] Item is null/undefined');
        return '';
      }
      
      // Check for imgurl (from products collection)
      if (Array.isArray(item?.imgurl) && item.imgurl.length > 0) {
        const imageUrl = item.imgurl[0];
        if (imageUrl) {
          console.log('[Home Image] Using imgurl:', imageUrl.substring(0, 80) + '...');
          return imageUrl;
        }
      }

      // Check for imageURI (from cart items)
      if (item?.imageURI) {
        console.log('[Home Image] Using imageURI:', item.imageURI.substring(0, 80) + '...');
        return item.imageURI;
      }
      
      // No image found
      console.warn('[Home Image] No image found for product:', {
        title: item?.title,
        hasImgurl: !!item?.imgurl,
        imgUrlCount: item?.imgurl?.length || 0,
        hasImageURI: !!item?.imageURI,
        keys: Object.keys(item || {})
      });
      return '';
    } catch (err) {
      console.error('[Home Image] Error getting image:', err);
      return '';
    }
  };

  const heroProduct = items[6] || items[0];

  const categories = [
    { icon: "memory", label: "Processors" },
    { icon: "developer_board", label: "Graphics Cards" },
    { icon: "monitor", label: "Displays" },
    { icon: "keyboard", label: "Accessories" },
  ];

  const features = [
    {
      icon: "ac_unit",
      title: "Thermal Efficiency",
      description:
        "Custom vapor chambers and liquid metal cooling systems designed to sustain peak performance under heavy load.",
    },
    {
      icon: "bolt",
      title: "Zero-Latency Interface",
      description:
        "Professional-grade responsiveness for carts, orders, and product discovery without slowing the shopping flow.",
    },
    {
      icon: "grid_view",
      title: "Curated Architecture",
      description:
        "A focused catalog experience built around premium products, clear details, and fast purchase paths.",
    },
  ];

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="home-eyebrow">New Release</span>
            <h1>Precision Engineered for the Modern Professional.</h1>
            <p>
              Discover high-performance gear for creative workflows, gaming,
              productivity, and everyday power users.
            </p>
            <div className="home-actions">
              <a className="home-btn home-btn-primary" href="#signature-series">
                Shop Now
              </a>
              <a className="home-btn home-btn-secondary" href="#core-tech">
                Learn More
              </a>
            </div>
          </div>

          <div className="home-hero-media" style={{backgroundColor:"white"}}>
            <img
              src={getProductImage(heroProduct)}
              style={{ objectFit: "contain",backgroundColor:"transparent" }}
              
              alt={heroProduct?.head || heroProduct?.title || "Vanguard Pro X-1 laptop"}
            />
            <div className="home-tech-badge">
              <span className="material-symbols-outlined">speed</span>
              <div>
                <small>Architecture</small>
                <strong>4nm Process</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-categories">
        <div className="home-shell home-category-grid">
          {categories.map((category) => (
            <button className="home-category-card" type="button" key={category.label}>
              <span className="material-symbols-outlined">{category.icon}</span>
              <strong>{category.label}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="home-products" id="signature-series">
        <div className="home-shell">
          <div className="home-section-head">
            <div>
              <h2>Signature Series</h2>
              <p>The vanguard of engineering excellence.</p>
            </div>
            <a href="#signature-series">View Collection</a>
          </div>

          {items.length > 0 ? (
            <div className="home-product-grid">
              {items.map((item, key) => (
                <article className="home-product-card" key={item._id || key}>
                  <button
                    className="home-product-image"
                    type="button"
                    onClick={() => goToDetails(item)}
                    aria-label={`View ${item.head || item.title || "product"} details`}
                  >
                    <img style={{objectFit:"contain"}}
                      src={getProductImage(item)}
                      alt={item.head || item.title || "Product"}
                    />
                  </button>
                  <div className="home-product-info">
                    <h3>{item.head || item.title}</h3>
                    <p>{item.title || "High-performance hardware, selected for serious everyday use."}</p>
                    <div className="home-product-bottom">
                      <span>{item.price}</span>
                      <button type="button" onClick={() => addItem(item)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="home-empty-products">
              <span className="material-symbols-outlined">inventory_2</span>
              <p>No products available right now.</p>
            </div>
          )}
        </div>
      </section>

      <section className="home-tech" id="core-tech">
        <div className="home-shell home-tech-grid">
          {features.map((feature) => (
            <div className="home-tech-item" key={feature.title}>
              <div className="home-tech-icon">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="home-shell">
          <h2>Build your studio with precision.</h2>
          <form className="home-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-shell home-footer-grid">
          <div>
            <h3>Neon Gear</h3>
            <p>
              Precision engineered hardware for creators, engineers, and digital
              architects.
            </p>
          </div>
          <div>
            <span>Products</span>
            <a href="#signature-series">Processors</a>
            <a href="#signature-series">Graphics Cards</a>
            <a href="#signature-series">Laptops</a>
          </div>
          <div>
            <span>Support</span>
            <a href="/contact">Documentation</a>
            <a href="/contact">Shipping Info</a>
            <a href="/contact">Return Policy</a>
          </div>
          <div>
            <span>Legal</span>
            <a href="#signature-series">Privacy</a>
            <a href="#signature-series">Terms of Service</a>
            <a href="#signature-series">Compliance</a>
          </div>
        </div>
        <div className="home-shell home-footer-bottom">
          <p>Copyright 2026 Neon Gear. Precision Engineered.</p>
          <div>
            <span className="material-symbols-outlined">public</span>
            <span className="material-symbols-outlined">share</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
