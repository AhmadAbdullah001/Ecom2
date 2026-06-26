import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import itemContext from "../context/Context";
import { normalizeImageSrc } from "../utils/images";
import { normalizeCategoryName, productMatchesCategory } from "../utils/categories";
import "../styles/home.css";

function Home(props) {
  const nav = useNavigate();
  const context = useContext(itemContext);
  const { addtocart, fetchproducts, getCategories, searchProducts } = context;
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState(null);
  const searchTimeout = useRef(null);
  const searchWrapper = useRef(null);

  const goToDetails = (item) => {
    nav("/itemdetails", { state: item });
  };

  const getProductArray = useCallback(async () => {
    try {
      console.log('[Home] 🔄 Fetching products...');
      const [temp, categories] = await Promise.all([fetchproducts(), getCategories()]);
      
      console.log('[Home] 📊 Got products:', temp?.length || 0);
      console.log('[Home] 📁 Got categories:', categories?.length || 0);
      
      if (categories && categories.length > 0) {
        console.log('[Home] 📂 Available categories:', categories.map(c => c.name));
      }
      
      const productArray = Array.isArray(temp) ? temp.filter(Boolean) : [];
      console.log('[Home] ✅ Total valid products:', productArray.length);

      // Filter for only "home" category products
      const homeProducts = productArray.filter(p => 
        p.categoryName && p.categoryName.toLowerCase() === 'home'
      );
      
      console.log('[Home] 🏠 Home category products:', homeProducts.length);

      if (homeProducts.length > 0) {
        console.log('[Home] 🎉 Displaying', homeProducts.length, 'home products');
        
        // Show product summary
        homeProducts.slice(0, 3).forEach((p, i) => {
          console.log(`  Product ${i + 1}: ${p.title} - Rs.${p.price}`, {
            hasImages: !!p.imgurl && p.imgurl.length > 0,
            imageCount: p.imgurl?.length || 0
          });
        });
        
        setItems(homeProducts);
      } else {
        console.warn('[Home] ⚠️ No products found with categoryName="home"');
        props.showalert?.('No products available for home page. Please add products with categoryName="home"', 'info');
        setItems([]);
      }
    } catch (err) {
      console.error('[Home] ❌ Error loading products:', err);
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

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchStatus(null);
    setIsSearchOpen(false);
  };

  const runSearch = async (query) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }
    setSearchStatus('loading');
    const results = await searchProducts(query.trim());
    setSearchResults(results.slice(0, 3));
    setSearchStatus(results.length === 0 ? 'empty' : 'ready');
    setIsSearchOpen(true);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => runSearch(value), 350);
  };

  const handleResultClick = (product) => {
    nav('/itemdetails', { state: product });
    clearSearch();
  };

  const handleClickOutside = (event) => {
    if (searchWrapper.current && !searchWrapper.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const getProductImage = (item) => {
    try {
      if (!item) {
        console.warn('[Home Image] Item is null/undefined');
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
      }
      
      // Check for imgurl (from products collection)
      if (Array.isArray(item?.imgurl) && item.imgurl.length > 0 && item.imgurl[0]) {
        const imageUrl = item.imgurl[0];
        console.log('[Home Image] ✅ Using imgurl:', imageUrl.substring(0, 80) + '...');
        return imageUrl;
      }

      // Check for imageURI (from cart items)
      if (item?.imageURI) {
        console.log('[Home Image] ✅ Using imageURI:', item.imageURI.substring(0, 80) + '...');
        return item.imageURI;
      }
      
      // No image found - show placeholder
      console.warn('[Home Image] ⚠️ No image found for product:', {
        title: item?.title,
        price: item?.price,
        hasImgurl: !!item?.imgurl,
        imgUrlCount: item?.imgurl?.length || 0,
        hasImageURI: !!item?.imageURI,
        imgurlContent: item?.imgurl
      });
      
      // Return placeholder
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e3f2fd" width="200" height="200"/%3E%3Ctext x="50%" y="40%" text-anchor="middle" dy=".3em" fill="%231976d2" font-family="Arial" font-size="12" font-weight="bold"%3E' + encodeURIComponent(item?.title?.substring(0, 15) || 'Product') + '%3C/text%3E%3Ctext x="50%" y="55%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="11"%3ENo Image%3C/text%3E%3C/svg%3E';
    } catch (err) {
      console.error('[Home Image] Error getting image:', err);
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffebee" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23d32f2f" font-family="Arial" font-size="14"%3EError%3C/text%3E%3C/svg%3E';
    }
  };

  const heroProduct = items[6] || items[0];

  const categories = [
    { icon: "memory", label: "Processors", path: "/processors" },
    { icon: "developer_board", label: "Graphics Cards", path: "/graphics" },
    { icon: "monitor", label: "Displays", path: "/monitors" },
    { icon: "keyboard", label: "Accessories", path: "/keyboards" },
  ];

  const handleCategoryClick = (path) => {
    nav(path);
  };

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
            <div className="home-search" ref={searchWrapper}>
              <input
                type="search"
                className="home-search-input"
                placeholder="Search all products"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search products"
              />
              {isSearchOpen && (
                <div className="home-search-results">
                  {searchStatus === 'loading' && (
                    <div className="home-search-empty">Searching...</div>
                  )}
                  {searchStatus === 'empty' && (
                    <div className="home-search-empty">No products found</div>
                  )}
                  {searchStatus === 'ready' && searchResults.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      className="home-search-result"
                      onClick={() => handleResultClick(product)}
                    >
                      <img loading="lazy"
                        src={product.imgurl?.[0] || ''}
                        alt={product.head || product.title || 'Product'}
                        className="home-search-result-image"
                      />
                      <span>{product.head || product.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            <img loading="lazy"
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
            <button 
              className="home-category-card" 
              type="button" 
              key={category.label}
              onClick={() => handleCategoryClick(category.path)}
              aria-label={`View ${category.label}`}
            >
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
                    <img loading="lazy" style={{objectFit:"contain"}}
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
            <h3>GearUP</h3>
            <p>
              Precision engineered hardware for creators, engineers, and digital
              architects.
            </p>
          </div>
          <div>
            <span>Products</span>
            <Link to="/processors">Processors</Link>
            <Link to="/graphics">Graphics Cards</Link>
            <Link to="/laptops">Laptops</Link>
          </div>
          <div>
            <span>Support</span>
            <Link to="/documentation">Documentation</Link>
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/return-policy">Return Policy</Link>
          </div>
          <div>
            <span>Legal</span>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/compliance">Compliance</Link>
          </div>
        </div>
        <div className="home-shell home-footer-bottom">
          <p>Copyright 2026 GearUP. Precision Engineered.</p>
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
