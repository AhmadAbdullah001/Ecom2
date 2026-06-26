import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import itemContext from "../context/Context";
import { API_HOST } from "../config";
import { normalizeImageSrc } from "../utils/images";
import "../styles/profile.css";

function Profile(props) {
  const { fetchDetails, updateProfile, uploadAvatar, updateAddress, getreview } = useContext(itemContext);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [addressData, setAddressData] = useState({ street: "", apartment: "", city: "", state: "", zipcode: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const showalert = props.showalert;
  const avatarInputRef = useRef(null);

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
      setProfileData({
        name: details?.name || "",
        email: details?.email || "",
        phone: details?.phone || "",
      });

      if (details?.address) {
        const [streetPart, cityStateZip] = details.address.split(", ");
        const addressParts = cityStateZip ? cityStateZip.split(" ") : [];
        setAddressData({
          street: streetPart || "",
          apartment: "",
          city: addressParts[0] || "",
          state: addressParts[1] || "",
          zipcode: addressParts[2] || "",
        });
      }

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

      try {
        const reviewData = await getreview(details?._id);
        setReviews(Array.isArray(reviewData) ? reviewData : []);
      } catch (error) {
        console.error("Error fetching profile reviews:", error);
      }
    };

    loadProfile();
  }, [fetchDetails, getreview, nav, showalert]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Current");
    showalert("Logout Successful", "success");
    nav("/");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProfile = async () => {
    try {
      setLoading(true);
      const updated = await updateProfile(profileData);
      if (!updated) {
        throw new Error("No user returned from server");
      }
      setUser(updated);
      setProfileData({
        name: updated.name || "",
        email: updated.email || "",
        phone: updated.phone || "",
      });
      setIsEditingProfile(false);
      showalert("Profile updated successfully", "success");
    } catch (error) {
      showalert(error.message || "Failed to update profile", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAddress = async () => {
    try {
      setLoading(true);
      const updated = await updateAddress(addressData);
      if (!updated) {
        throw new Error("No user returned from server");
      }
      setUser(updated);

      if (updated.address) {
        const [streetPart, cityStateZip] = updated.address.split(", ");
        const addressParts = cityStateZip ? cityStateZip.split(" ") : [];
        setAddressData({
          street: streetPart || "",
          apartment: "",
          city: addressParts[0] || "",
          state: addressParts[1] || "",
          zipcode: addressParts[2] || "",
        });
      } else {
        setAddressData((prev) => ({ ...prev }));
      }

      setIsEditingAddress(false);
      showalert("Address updated successfully", "success");
    } catch (error) {
      showalert(error.message || "Failed to update address", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      showalert("Please choose a profile image first", "warning");
      return;
    }

    try {
      setLoading(true);
      const updated = await uploadAvatar(avatarFile);
      setUser(updated);
      showalert("Profile avatar uploaded", "success");
      setAvatarFile(null);
      setAvatarPreview("");
    } catch (error) {
      showalert(error.message || "Failed to upload avatar", "danger");
    } finally {
      setLoading(false);
    }
  };

  const displayName =
    user?.name || localStorage.getItem("Current") || "GearUP User";
  const email = user?.email || localStorage.getItem("Current") || "Signed in";
  const latestOrders = orders.slice(0, 2);

  const profileAvatar = user?.avatar || avatarPreview || null;

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <header className="profile-header">
          <div className="profile-identity">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar overflow-hidden">
                {profileAvatar ? (
                  <img  style={{ width: "100%", height: "100%", objectFit: "cover" }} src={normalizeImageSrc(profileAvatar)} alt="Profile avatar" />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </div>
              <button
                className="profile-edit-avatar"
                type="button"
                aria-label="Edit avatar"
                onClick={() => avatarInputRef.current?.click()}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarSelect}
              />      
              {avatarFile && (
                <div className="profile-avatar-actions">
                  <button type="button" className="profile-upload-btn" onClick={handleUploadAvatar} disabled={loading}>
                    {loading ? "Uploading..." : "Upload Avatar"}
                  </button>
                  <button
                    type="button"
                    className="profile-cancel-btn"
                    onClick={() => {
                      setAvatarFile(null);
                      setAvatarPreview("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
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
            <button type="button" onClick={() => setIsEditingProfile((prev) => !prev)}>
              {isEditingProfile ? "Cancel" : "Edit Profile"}
            </button>
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
                {isEditingProfile ? (
                  <>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="Phone number"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p>Email</p>
                      <strong>{email}</strong>
                    </div>
                    <div>
                      <p>Phone</p>
                      <strong>{user?.phone || "Not available"}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isEditingProfile ? (
              <button className="profile-text-link" type="button" onClick={handleSubmitProfile} disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </button>
            ) : (
              <button className="profile-text-link" type="button" onClick={() => setIsEditingProfile(true)}>
                Edit Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </section>

          <section className="profile-card profile-shipping-card">
            <div className="profile-card-head">
              <h2>Shipping</h2>
              <button type="button" onClick={() => setIsEditingAddress((prev) => !prev)}>
                {isEditingAddress ? "Cancel" : "Edit"}
              </button>
            </div>
            {isEditingAddress ? (
              <div className="profile-address-form">
                <div className="input-row">
                  <input
                    type="text"
                    name="street"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    placeholder="Street address"
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={addressData.apartment}
                    onChange={handleAddressChange}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={addressData.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="zipcode"
                    value={addressData.zipcode}
                    onChange={handleAddressChange}
                    placeholder="ZIP code"
                  />
                </div>
                <button className="profile-dashed-btn" type="button" onClick={handleSubmitAddress} disabled={loading}>
                  {loading ? "Saving..." : "Save Address"}
                </button>
              </div>
            ) : (
              <>
                <div className="profile-address-box">
                  <span className="material-symbols-outlined">home</span>
                  <div>
                    <strong>Primary Residence</strong>
                    <p>{user?.address || "No saved address available."}</p>
                  </div>
                </div>
              </>
            )}
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
            {reviews.length > 0 ? (
              reviews.map((review, index) => {
                const filledStars = 5;
                return (
                  <div className="profile-review" key={review._id || review.uid || index}>
                    <div className="profile-stars">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`material-symbols-outlined ${starIndex < filledStars ? "" : "empty"}`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <strong>{review.Name || "Untitled review"}</strong>
                    <p>{review.comment || "No review text available."}</p>
                  </div>
                );
              })
            ) : (
              <div className="profile-empty-state">
                <span className="material-symbols-outlined">rate_review</span>
                <p>No reviews yet.</p>
              </div>
            )}
          </section>
        </div>
      </section>

      <footer className="profile-footer">
        <div className="profile-footer-shell">
          <div>
            <h2>GearUP</h2>
            <p>
              Engineered for performance. Designed for the minimalist.
              Experience the future of hardware.
            </p>
          </div>
          <div className="profile-footer-links">
            <div>
              <h3>Company</h3>
              <Link to="/contact">About</Link>
              <Link to="/contact">Press</Link>
              <Link to="/contact">Careers</Link>
            </div>
            <div>
              <h3>Support</h3>
              <Link to="/return-policy">Warranty</Link>
              <Link to="/shipping">Shipping</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="profile-footer-bottom">
          <p>Copyright 2026 GearUP Studio. All Rights Reserved.</p>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Profile;
