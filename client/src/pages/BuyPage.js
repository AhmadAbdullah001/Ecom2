import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import itemContext from '../context/Context';
import { useLocation } from 'react-router-dom'
import { API_HOST } from '../config';
import { normalizeImageSrc } from '../utils/images';
import '../styles/buypage.css';

// Dynamically load Cashfree SDK
const loadCashfreeSDK = async () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/core/3.0.0/cashfree.js';
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        reject(new Error('Cashfree not loaded'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
    document.body.appendChild(script);
  });
};

function BuyPage(props) {
  let loc = useLocation()
  let nav = useNavigate()
  const [currentuser, setCurrentUser] = useState({ id: "", name: "", email: "", phone: "", address: "" });
  const [qty, setqty] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [showCODConfirmation, setShowCODConfirmation] = useState(false);
  const [showCashfreeModal, setShowCashfreeModal] = useState(false);
  const [cashfreeLoading, setCashfreeLoading] = useState(false);
  const [cashfreeReady, setCashfreeReady] = useState(false);

  const context = useContext(itemContext)
  const { fetchDetails, updateAddress } = context

  // Get product data from navigation state (declare BEFORE hooks)
  let currentitem = loc.state?.current || loc.state || {};
  const [img, setimg] = useState();

  // Initialize Cashfree SDK on component mount
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cf = await loadCashfreeSDK();
        console.log('Cashfree SDK loaded successfully:', cf);
        setCashfreeReady(true);
      } catch (error) {
        console.error('Failed to load Cashfree SDK:', error);
        // Still mark as ready to allow payment attempts
        setCashfreeReady(true);
      }
    };

    initializeCashfree();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      const userDetails = await fetchDetails(localStorage.getItem("token"));
      setCurrentUser(userDetails);
      // Show form if address is empty or not provided
      if (!userDetails.address || userDetails.address.trim() === '') {
        setShowAddressForm(true);
      }
    };
    getDetails();
  }, []);

  // Validate product data on mount
  useEffect(() => {
    if (!currentitem) {
      console.error('[BuyPage] No product data received!');
      props.showalert("Product data not found. Please select a product again.", "danger");
      return;
    }

    const missingFields = [];
    if (!currentitem.head && !currentitem.title) missingFields.push("product name");
    if (!currentitem.price) missingFields.push("price");
    if (!currentitem.imgurl || (Array.isArray(currentitem.imgurl) && currentitem.imgurl.length === 0)) {
      missingFields.push("product image");
    }

    if (missingFields.length > 0) {
      console.warn('[BuyPage] ⚠️ Product has missing data:', missingFields);
      console.log('[BuyPage] Product object:', {
        head: currentitem.head,
        title: currentitem.title,
        price: currentitem.price,
        imgurl: currentitem.imgurl,
        imageURI: currentitem.imageURI,
      });
      
      if (!currentitem.price) {
        props.showalert(`⚠️ Product price is missing. Please contact support.`, "warning");
      }
    }
  }, [currentitem, props]);

  useEffect(() => {
    console.log('[BuyPage] Current item:', {
      title: currentitem?.title,
      price: currentitem?.price,
      hasImgurl: !!currentitem?.imgurl,
      imgurlLength: Array.isArray(currentitem?.imgurl) ? currentitem.imgurl.length : 0,
    });

    if (currentitem) {
      // Try imgurl first (from products), then imageURI (from cart items)
      if (Array.isArray(currentitem.imgurl) && currentitem.imgurl.length > 0 && currentitem.imgurl[0]) {
        setimg(normalizeImageSrc(currentitem.imgurl[0]));
      } else if (currentitem.imageURI) {
        setimg(normalizeImageSrc(currentitem.imageURI));
      } else {
        // Fallback to placeholder
        console.warn('[BuyPage] No image URL found for product:', currentitem.title);
        setimg(null);
      }
    }
  }, [currentitem]);

  // Helper function to parse price - handles both "$58.7" and "58.7" formats
  const parsePrice = (priceStr) => {
    if (!priceStr) {
      console.warn('[BuyPage Price] Price is null or empty!');
      return 0;
    }
    // Remove $ if present and convert to number
    const numStr = typeof priceStr === 'string' ? priceStr.replace(/[$,]/g, '') : priceStr.toString();
    const num = parseFloat(numStr);
    const result = isNaN(num) ? 0 : num;
    console.log('[BuyPage Price] Parsed:', { input: priceStr, output: result });
    return result;
  };

  const price = parsePrice(currentitem?.price);
  const subtotal = (price * qty).toFixed(2);
  const gst = (0.18 * price * qty).toFixed(2);
  const delivery = 5.00;
  const total = (parseFloat(subtotal) + parseFloat(gst) + delivery).toFixed(2);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    if (!addressData.street || !addressData.city || !addressData.state || !addressData.zipcode) {
      props.showalert("Please fill all address fields", "danger");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateAddress(addressData);
      setCurrentUser(updatedUser);
      setShowAddressForm(false);
      props.showalert("Address saved successfully", "success");
    } catch (error) {
      props.showalert(error.message || "Failed to save address", "danger");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCODConfirmation = async () => {
    if (!localStorage.getItem('token')) {
      props.showalert("Login Required", "danger")
      return
    }

    if (!currentuser.address || currentuser.address.trim() === '') {
      props.showalert("Please add delivery address first", "danger");
      setShowAddressForm(true);
      return;
    }

    setShowCODConfirmation(false);
    setOrderPlacing(true);

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-In', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit'
    }).format(today);

    try {
      const res = await fetch(`${API_HOST}/api/orders/addorders`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
          imageURI: img,
          title: currentitem.head || currentitem.title,
          price: total,
          date: formattedDate,
          paymentMethod: 'COD',
          quantity: qty
        })
      });

      if (!res.ok) throw new Error("Order failed");
      props.showalert("Order Placed Successfully - Payment on Delivery", "success")
      nav('/')
    } catch (error) {
      props.showalert("Some Error Occurred", "danger")
      console.log(error)
    } finally {
      setOrderPlacing(false);
    }
  };

  const handleCashfreePayment = async () => {
    if (!localStorage.getItem('token')) {
      props.showalert("Login Required", "danger")
      return
    }

    if (!currentuser.address || currentuser.address.trim() === '') {
      props.showalert("Please add delivery address first", "danger");
      setShowAddressForm(true);
      return;
    }

    // Check if SDK is available
    if (!window.Cashfree) {
      props.showalert("Payment gateway is still loading. Please wait...", "warning");
      return;
    }

    setShowCashfreeModal(false);
    setCashfreeLoading(true);

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-In', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit'
    }).format(today);

    try {
      // Step 1: Create order via backend
      const createOrderRes = await fetch(`${API_HOST}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          productName: currentitem.head || currentitem.title,
          quantity: qty,
          imageURI: img,
          date: formattedDate
        })
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok) {
        throw new Error(orderData.error || orderData.details?.message || "Failed to create payment order");
      }

      // Step 2: Extract payment session ID from response
      const paymentSessionId = orderData.paymentSessionId || orderData.order_token;
      if (!paymentSessionId) {
        throw new Error("No payment session ID received from backend");
      }

      console.log("Opening Cashfree checkout with sessionId:", paymentSessionId);

      // Step 3: Open Cashfree checkout modal
      if (!window.Cashfree || !window.Cashfree.checkout) {
        throw new Error("Cashfree checkout method not available. Please refresh the page and try again.");
      }

      const response = await window.Cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal"
      });

      console.log("Cashfree checkout response:", response);

      // Step 4: Handle payment response
      if (response && response.orderId) {
        // Payment completed - verify with backend
        const verifyRes = await fetch(`${API_HOST}/api/payment/verify-payment`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({
            orderId: response.orderId,
            paymentId: response.paymentId
          })
        });

        const verifyData = await verifyRes.json();

        if (verifyRes.ok && verifyData.success) {
          props.showalert("Payment successful! Order placed.", "success");
          nav('/');
        } else {
          props.showalert("Payment verification failed", "danger");
        }
      } else {
        // User cancelled or payment incomplete
        props.showalert("Payment cancelled or incomplete", "warning");
      }
    } catch (error) {
      console.error('Payment error:', error);
      props.showalert(error.message || "Payment initiation failed", "danger")
    } finally {
      setCashfreeLoading(false);
    }
  };
  return (
    <div className="buy-page">
      
      <main className="checkout-main">
       

        <div className="checkout-grid">
          {/* Left Column: Forms */}
          <div className="checkout-forms">
            {/* Account Section */}
            <section className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-number">01</span>
                  Account Info
                </h2>
                <button className="change-btn" onClick={() => nav('/login')}>Change</button>
              </div>
              <div className="account-card">
                <div className="account-info">
                  <div className="account-avatar">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="account-name">{currentuser.name}</p>
                    <p className="account-phone">+91{currentuser.phone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Section */}
            <section className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-number">02</span>
                  Shipping Address
                </h2>
              </div>

              {!showAddressForm && currentuser.address ? (
                <div className="address-card">
                  <p className="address-text">{currentuser.address}</p>
                  <button 
                    className="change-btn"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        className="form-input"
                        placeholder="123 Precision Way"
                        value={addressData.street}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apartment/Suite</label>
                      <input
                        type="text"
                        name="apartment"
                        className="form-input"
                        placeholder="Suite 404"
                        value={addressData.apartment}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="form-row-three">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        name="city"
                        className="form-input"
                        placeholder="San Francisco"
                        value={addressData.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        name="state"
                        className="form-input"
                        placeholder="CA"
                        value={addressData.state}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        name="zipcode"
                        className="form-input"
                        placeholder="94103"
                        value={addressData.zipcode}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <button 
                    className="save-address-btn"
                    onClick={handleSaveAddress}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Address'}
                  </button>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-number">03</span>
                  Payment Method
                </h2>
              </div>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPaymentMethod === 'cod'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="payment-radio"
                  />
                  <div className="payment-card">
                    <div className="payment-header">
                      <span className="material-symbols-outlined">local_shipping</span>
                      <h3>Cash on Delivery</h3>
                    </div>
                    <p className="payment-description">Pay when you receive your order</p>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cashfree"
                    checked={selectedPaymentMethod === 'cashfree'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="payment-radio"
                    disabled={!cashfreeReady}
                  />
                  {/* <div className={`payment-card ${!cashfreeReady ? 'opacity-50' : ''}`}>
                    <div className="payment-header">
                      <span className="material-symbols-outlined">credit_card</span>
                      <h3>Online Payment</h3>
                      {!cashfreeReady && <span style={{fontSize: '11px', marginLeft: '8px', color: '#999'}}>Loading...</span>}
                    </div>
                    <p className="payment-description">Secure payment via Cashfree (UPI, Cards, Wallets)</p>
                  </div> */}
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-container">
            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>

              {/* Product Item */}
              <div className="product-item">
                <div className="product-image">
                  <img 
                    src={img || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'} 
                    alt={currentitem.title || currentitem.head || "Product"}
                    onError={(e) => {
                      console.warn('[BuyPage Image] Image failed to load:', img);
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffe3e3" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23d32f2f" font-family="Arial" font-size="12"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="product-details">
                  <h4 className="product-name">{currentitem.head || 'Product'}</h4>
                  <p className="product-subtitle">{currentitem.title || 'No description available'}</p>

                  {/* Quantity Selector */}
                  <div className="quantity-selector">
                    <button 
                      className="qty-btn"
                      onClick={() => setqty(Math.max(1, qty - 1))}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      className="qty-input"
                      value={qty}
                      onChange={(e) => setqty(Math.max(1, Number(e.target.value)))}
                      readOnly
                    />
                    <button 
                      className="qty-btn"
                      onClick={() => setqty(qty + 1)}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="price-row">
                  <span>GST (18%)</span>
                  <span>${gst}</span>
                </div>
                <div className="price-row">
                  <span>Delivery</span>
                  <span className="delivery-price">${delivery.toFixed(2)}</span>
                </div>
                <div className="price-row total-row">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button 
                className="confirm-btn"
                onClick={() => {
                  if (selectedPaymentMethod === 'cod') {
                    setShowCODConfirmation(true);
                  } else {
                    if (!window.Cashfree) {
                      props.showalert("Payment gateway is still loading. Please wait...", "warning");
                      return;
                    }
                    setShowCashfreeModal(true);
                  }
                }}
                disabled={orderPlacing || cashfreeLoading || (selectedPaymentMethod === 'cashfree' && !cashfreeReady)}
              >
                {orderPlacing || cashfreeLoading ? (
                  <>
                    <span className="spinner"></span>
                    {selectedPaymentMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...'}
                  </>
                ) : selectedPaymentMethod === 'cashfree' && !cashfreeReady ? (
                  <>
                    <span className="spinner"></span>
                    Loading Payment Gateway...
                  </>
                ) : (
                  <>
                    Proceed to {selectedPaymentMethod === 'cod' ? 'Checkout' : 'Payment'}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>

              {/* <p className="security-text">
                <span className="material-symbols-outlined">shield_lock</span>
                Precision encrypted checkout by AURA
              </p> */}
            </div>
          </div>
        </div>
      </main>

      {/* COD Confirmation Modal */}
      {showCODConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm Order</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCODConfirmation(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="confirmation-details">
                <div className="detail-row">
                  <span className="detail-label">Order Total:</span>
                  <span className="detail-value">${total}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">Cash on Delivery</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Delivery Address:</span>
                  <span className="detail-value">{currentuser.address}</span>
                </div>
              </div>
              <p className="modal-info">
                You will receive your order and can pay the amount at the time of delivery.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn"
                onClick={() => setShowCODConfirmation(false)}
                disabled={orderPlacing}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm-payment-btn"
                onClick={handleCODConfirmation}
                disabled={orderPlacing}
              >
                {orderPlacing ? (
                  <>
                    <span className="spinner-small"></span>
                    Placing Order...
                  </>
                ) : (
                  'Confirm Order'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cashfree Payment Modal */}
      {showCashfreeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Online Payment</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCashfreeModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="confirmation-details">
                <div className="detail-row">
                  <span className="detail-label">Order Total:</span>
                  <span className="detail-value">${total}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">Cashfree (UPI, Cards, Wallets)</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Delivery Address:</span>
                  <span className="detail-value">{currentuser.address}</span>
                </div>
              </div>
              <p className="modal-info">
                You will be redirected to the secure Cashfree payment gateway.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn"
                onClick={() => setShowCashfreeModal(false)}
                disabled={cashfreeLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm-payment-btn"
                onClick={handleCashfreePayment}
                disabled={cashfreeLoading}
              >
                {cashfreeLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="checkout-footer">
        <div className="footer-content">
          <p className="footer-text">© 2024 AURA. Precision Engineered.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#sustainability">Sustainability</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BuyPage;
