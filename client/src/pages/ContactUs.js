import React, { useState } from 'react';
import '../styles/contactus.css';

function ContactUs(props) {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f0fa4742-debd-4576-9f2c-250a4a4d8407',
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        props.showalert('Message Received. We will get back to you soon!', 'success');
        setFormData({ email: '', message: '' });
      } else {
        props.showalert('Error sending message. Please try again.', 'danger');
      }
    } catch (error) {
      props.showalert('Error occurred. Please try again.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="contactus-container">
      {/* Subtle Ambient Background */}
      <div className="contactus-background"></div>

      <div className="contactus-content">
        {/* Header Section */}
        <div className="contactus-header">
          <h1 className="contactus-title">Contact Us</h1>
          <p className="contactus-subtitle">
            Our team of specialists is standing by to assist with technical specifications, orders, and professional collaborations.
          </p>
        </div>

        {/* Content Grid: Form and Cards */}
        <div className="contactus-grid">
          {/* Contact Form Section */}
          <div className="form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
                <input
                  className="form-input"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">WRITE YOUR PROBLEM</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Describe the inquiry in detail..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                className="submit-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>

          {/* Information Cards Section */}
          <div className="cards-section">
            {/* Live Response Card */}
            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <span className="status-badge">Online</span>
              </div>
              <h3 className="card-title">Live Response</h3>
              <p className="card-description">
                Connect directly with our technicians for real-time troubleshooting and performance tuning advice.
              </p>
              <a href="#" className="card-link">
                Start Session
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>

            {/* Community Hub Card */}
            <div className="info-card">
              <div className="card-header">
                <div className="card-icon card-icon-secondary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
              <h3 className="card-title">Community Hub</h3>
              <p className="card-description">
                Access documentation, peer support, and user-driven optimizations for all gameGears systems.
              </p>
              <a href="#" className="card-link">
                Explore Forums
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactUs;