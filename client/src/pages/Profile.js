import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import itemContext from "../context/Context";
import { API_HOST } from "../config";
import { imageFallback, normalizeImageSrc } from "../utils/images";
import "../styles/profile.css";

function Profile(props) {
  const { fetchDetails } = useContext(itemContext);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();
  const showalert = props.showalert;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      showalert("Login Required", "danger");
      nav("/login");
      return;
    }

    const headers = {
      "auth-token": localStorage.getItem("token"),
    };

    const loadProfile = async () => {
      const details = await fetchDetails();
      setUser(details || {});

      try {
        const cartRes = await fetch(`${API_HOST}/api/items/fetchitems`, { headers });
        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCartItems(Array.isArray(cartData.items) ? cartData.items : []);
        }
      } catch (error) {
        console.error("Error fetching profile cart:", error);
      }

      try {
        const ordersRes = await fetch(`${API_HOST}/api/orders/fetchorders`, { headers });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(Array.isArray(ordersData) ? ordersData : []);
        }
      } catch (error) {
        console.error("Error fetching profile orders:", error);
      }
    };

    loadProfile();
  }, [fetchDetails, nav, showalert]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Current");
    showalert("Logout Successful", "success");
    nav("/");
  };

  const displayName =
    user?.name || localStorage.getItem("Current") || "Neon Gear User";
  const email = user?.email || localStorage.getItem("Current") || "Signed in";
  const latestOrders = orders.slice(0, 2);

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <header className="profile-header">
          <div className="profile-identity">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <span className="material-symbols-outlined">person</span>
              </div>
              <button className="profile-edit-avatar" type="button" aria-label="Edit avatar">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div>
              <span className="profile-eyebrow">Premium Member</span>
              <h1>{displayName}</h1>
              <div className="profile-meta-row">
                <span>Pro Tier</span>
                <p>Member since 2026</p>
              </div>
            </div>
          </div>

          <div className="profile-header-actions">
            <button type="button">Edit Profile</button>
            <button type="button" onClick={logout}>
              Sign Out
            </button>
          </div>
        </header>

        <div className="profile-bento-grid">
          <section className="profile-card profile-account-card">
            <div>
              <div className="profile-card-head">
                <h2>Account</h2>
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div className="profile-field-list">
                <div>
                  <p>Email</p>
                  <strong>{email}</strong>
                </div>
                <div>
                  <p>Phone</p>
                  <strong>{user?.phone || "Not available"}</strong>
                </div>
              </div>
            </div>
            <button className="profile-text-link" type="button">
              Manage Security
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </section>

          <section className="profile-card profile-shipping-card">
            <div className="profile-card-head">
              <h2>Shipping</h2>
              <button type="button">Edit</button>
            </div>
            <div className="profile-address-box">
              <span className="material-symbols-outlined">home</span>
              <div>
                <strong>Primary Residence</strong>
                <p>{user?.address || "No saved address available."}</p>
              </div>
            </div>
            <button className="profile-dashed-btn" type="button">
              <span className="material-symbols-outlined">add_location</span>
              Add New Address
            </button>
          </section>

          <section className="profile-cart-card">
            <div>
              <div className="profile-cart-head">
                <h2>Your Cart</h2>
                <span>{cartItems.length}</span>
              </div>
              <p>Items waiting for checkout</p>
            </div>
            <button type="button" onClick={() => nav("/cart")}>
              Go to Cart
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </section>

          <section className="profile-card profile-orders-card">
            <div className="profile-card-head">
              <h2>Orders & Activity</h2>
              <Link to="/orders">View History</Link>
            </div>

            <div className="profile-orders-list">
              {latestOrders.length > 0 ? (
                latestOrders.map((order) => (
                  <article className="profile-order-row" key={order._id}>
                    <div className="profile-order-main">
                      <div className="profile-order-image">
                        <img
                          src={normalizeImageSrc(order.imageURI)}
                          alt={order.title || "Ordered item"}
                          onError={imageFallback}
                        />
                      </div>
                      <div>
                        <strong>{order.title}</strong>
                        <p>Order #{order._id?.slice(-6) || "NEON"} • Ordered {order.date || "recently"}</p>
                      </div>
                    </div>
                    <div className="profile-order-price">
                      <strong>${order.price}</strong>
                      <span>Success</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="profile-empty-state">
                  <span className="material-symbols-outlined">receipt_long</span>
                  <p>No orders yet.</p>
                </div>
              )}
            </div>
          </section>

          <section className="profile-card profile-reviews-card">
            <h2>Past Reviews</h2>
            <div className="profile-review">
              <div className="profile-stars">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <strong>Neon Horizon Ultra 32"</strong>
              <p>"The color accuracy on this display is unmatched."</p>
            </div>
            <div className="profile-review">
              <div className="profile-stars">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined empty">star</span>
              </div>
              <strong>Neon Forge TKL</strong>
              <p>"Build quality is solid. Swapping switches was a breeze."</p>
            </div>
          </section>
        </div>
      </section>

      <footer className="profile-footer">
        <div className="profile-footer-shell">
          <div>
            <h2>NEON GEAR</h2>
            <p>
              Engineered for performance. Designed for the minimalist.
              Experience the future of hardware.
            </p>
          </div>
          <div className="profile-footer-links">
            <div>
              <h3>Company</h3>
              <a href="/contact">About</a>
              <a href="/contact">Press</a>
              <a href="/contact">Careers</a>
            </div>
            <div>
              <h3>Support</h3>
              <a href="/contact">Warranty</a>
              <a href="/contact">Shipping</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="profile-footer-bottom">
          <p>Copyright 2026 NEON GEAR STUDIO. All Rights Reserved.</p>
          <div>
            <a href="/contact">Privacy</a>
            <a href="/contact">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Profile;
