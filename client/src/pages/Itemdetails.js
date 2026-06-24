import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import itemContext from "../context/Context";
import { normalizeImageSrc } from "../utils/images";
import "../styles/itemdetails.css";

function Itemdetails(props) {
  const { addtocart, addreview, getreview } = useContext(itemContext);
  const nav = useNavigate();
  const loc = useLocation();
  const current = loc.state || null;
  const uid = current?._id;

  const images = useMemo(() => {
    if (Array.isArray(current?.imgurl) && current.imgurl.length > 0) {
      return current.imgurl;
    }

    if (current?.imageURI) {
      return [current.imageURI];
    }

    return [];
  }, [current]);

  const [url, setUrl] = useState(normalizeImageSrc(images[0]));
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ comment: "", rating: 0 });

  useEffect(() => {
    if (!current) {
      props.showalert("Product details unavailable", "warning");
      nav("/");
    }
  }, [current, nav, props]);

  useEffect(() => {
    setUrl(normalizeImageSrc(images[0]));
  }, [images]);

  useEffect(() => {
    if (!uid) return;

    const fetchReviews = async () => {
      const fetchedReviews = await getreview(uid);
      setReviews(Array.isArray(fetchedReviews) ? fetchedReviews : []);
    };

    fetchReviews();
  }, [uid, getreview]);

  if (!current) {
    return null;
  }

  const {
    head,
    title,
    price,
    detail = [],
    productDetails,
    productdetails,
  } = current;

  const productTitle = head || title || "GearUP Product";
  const productDescription =
    title ||
    "Precision engineering meets premium materials for high-performance everyday use.";
  const productInfo = productDetails || productdetails || {};
  const material = productInfo.Material || productInfo.material || "Not specified";
  const country = productInfo.Country || productInfo.country || "Not specified";

  const featureIcons = ["location_on", "mic", "fitness_center", "battery_charging_full"];
  const aboutItems =
    detail.length > 0
      ? detail.slice(0, 4)
      : [
          "Precision-tuned performance for everyday workflows.",
          "Premium materials with a refined industrial finish.",
          "Reliable battery and durable hardware construction.",
          "Designed for a clean, professional setup.",
        ];

  const changeUrl = (img) => {
    setUrl(normalizeImageSrc(img));
  };

  const buyPage = () => {
    if (!localStorage.getItem("token")) {
      props.showalert("Login Required", "danger");
      return;
    }

    nav("/buypage", { state: current });
  };

  const submitReview = async () => {
    if (!review.comment.trim()) {
      props.showalert("Write a review first", "warning");
      return;
    }

    if (!review.rating || review.rating < 1) {
      props.showalert("Please select a star rating", "warning");
      return;
    }

    const newReview = {
      uid,
      Name: localStorage.getItem("Current") || "Guest",
      comment: review.comment.trim(),
      rating: review.rating,
    };

    const savedReview = await addreview(newReview);
    if (savedReview && !savedReview.error) {
      setReviews((prev) => [savedReview, ...prev]);
      setReview({ comment: "", rating: 0 });
      props.showalert("Review submitted", "success");
    }
  };

  return (
    <main className="item-page">
      <section className="item-shell item-hero-grid">
        <div className="item-gallery">
          <div className="item-main-image">
            <img
              src={url}
              alt={productTitle}
            />
          </div>

          <div className="item-thumbnails">
            {(images.length > 0 ? images : [url]).map((img, key) => {
              const thumbSrc = normalizeImageSrc(img);
              return (
                <button
                  className={`item-thumb ${thumbSrc === url ? "active" : ""}`}
                  key={`${thumbSrc}-${key}`}
                  type="button"
                  onClick={() => changeUrl(img)}
                >
                  <img
                    src={thumbSrc}
                    alt={`${productTitle} view ${key + 1}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <aside className="item-info-panel">
          <div>
            <div className="item-rating-row">
              <span className="item-badge">New Arrival</span>
              <div className="item-stars">
                {Array.from({ length: 5 }, (_, idx) => (
                  <span className="material-symbols-outlined" key={idx}>
                    {idx < Math.round(reviews.reduce((sum, item) => sum + (item.rating || 0), 0) / Math.max(reviews.length, 1)) ? 'star' : 'star_border'}
                  </span>
                ))}
                <small>({reviews.length || 0} Reviews)</small>
              </div>
            </div>
            <h1>{productTitle}</h1>
            <p>{productDescription}</p>
          </div>

          <div className="item-price-block">
            <span>Pricing</span>
            <strong>{price}</strong>
          </div>

          <div className="item-actions">
            <button type="button" onClick={buyPage}>
              Buy Now
            </button>
            <button type="button" onClick={() => addtocart(current)}>
              Add to Cart
            </button>
          </div>

          <div className="item-product-details">
            <h3>Product Details</h3>
            <ul>
              <li>
                <span></span>
                <strong>Material:</strong> {material}
              </li>
              <li>
                <span></span>
                <strong>Country of Origin:</strong> {country}
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="item-shell item-detail-grid">
        <div className="item-card">
          <h2>About the Item</h2>
          <div className="item-feature-grid">
            {aboutItems.map((item, index) => (
              <div className="item-feature" key={`${item}-${index}`}>
                <div>
                  <span className="material-symbols-outlined">
                    {featureIcons[index] || "check_circle"}
                  </span>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="item-review-form">
          <h2>Write a review</h2>
          <div className="item-form-stars">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                type="button"
                className={review.rating >= starValue ? 'selected-star' : ''}
                onClick={() => setReview((prev) => ({ ...prev, rating: starValue }))}
                aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
              >
                <span className="material-symbols-outlined">
                  {review.rating >= starValue ? 'star' : 'star_border'}
                </span>
              </button>
            ))}
          </div>
          <textarea
            placeholder={`Share your experience with ${productTitle}...`}
            rows="4"
            value={review.comment}
            onChange={(event) => setReview((prev) => ({ ...prev, comment: event.target.value }))}
          />
          <button type="button" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </section>

      <section className="item-shell item-reviews-section">
        <div className="item-reviews-head">
          <h2>Product Reviews</h2>
          <button type="button">
            View All
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {reviews.length > 0 ? (
          <div className="item-review-grid">
            {reviews.map((reviewItem, index) => (
              <article className="item-review-card" key={reviewItem._id || index}>
                <div className="item-review-card-head">
                  <div>
                    <strong>{reviewItem.Name || "GearUP User"}</strong>
                    <div className="item-stars">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <span className="material-symbols-outlined" key={idx}>
                          {idx < (reviewItem.rating || 0) ? 'star' : 'star_border'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span>Recent</span>
                </div>
                <p>"{reviewItem.comment}"</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="item-empty-reviews">
            <span className="material-symbols-outlined">rate_review</span>
            <p>No reviews yet.</p>
          </div>
        )}
      </section>

      <footer className="item-footer">
        <div className="item-shell item-footer-inner">
          <span>Neon Studio</span>
          <div>
            <a href="/contact">Privacy</a>
            <a href="/contact">Terms</a>
            <a href="/contact">Shipment</a>
            <a href="/contact">Support</a>
          </div>
          <p>Copyright 2026 NEON STUDIO. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default Itemdetails;
