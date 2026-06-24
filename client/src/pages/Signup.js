import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../config";
import '../styles/signup.css'

function Signup(props) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      props.showalert("Please accept Terms and Privacy Policy", "warning");
      return;
    }

    setIsLoading(true);

    const createAccount = async (addressValue = "") => {
      try {
        const res = await fetch(`${API_HOST}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: details.name,
            email: details.email,
            phone: details.phone,
            password: details.password,
            address: addressValue,
          }),
        });

        const note = await res.json();

        if (note.flag === 2) {
          props.showalert(
            addressValue ? "Account Created Successfully" : "Account Created Successfully without location",
            "success"
          );
          navigate("/login");
        } else if (note.flag === 1) {
          props.showalert("Account already exists", "warning");
          navigate("/login");
        } else {
          props.showalert("Error occurred", "danger");
        }
      } catch (error) {
        props.showalert("An error occurred. Please try again.", "danger");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAddress = async (lat, long) => {
      try {
        const apiKey = "c8e92377fa1b473c8d917eca49aa6198";
        const apiEndpoint = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat}%2C${long}&pretty=1`;
        const locRes = await fetch(apiEndpoint);
        const data = await locRes.json();
        const formatted = data.results?.[0]?.formatted || "";
        return formatted;
      } catch (error) {
        console.log("Error fetching address:", error);
        return "";
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const caddress = await fetchAddress(lat, long);

          if (!caddress) {
            props.showalert("Location permission accepted but address lookup failed. Account will still be created.", "warning");
          }
          createAccount(caddress || "");
        },
        (error) => {
          console.log("Error getting location", error);
          props.showalert("Location denied or unavailable. Account will still be created.", "info");
          createAccount("");
        },
        { timeout: 10000 }
      );
    } else {
      props.showalert("Location services are not supported. Creating account without location.", "info");
      createAccount("");
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <main className="signup-container">
      {/* Atmospheric Background Decoration */}
      <div className="signup-background-decoration">
        <div className="decoration-blob decoration-blob-1"></div>
        <div className="decoration-blob decoration-blob-2"></div>
      </div>

      {/* Signup Content */}
      <div className="signup-content">
        {/* Header Section */}
        <div className="signup-header">
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Join the community of gaming enthusiasts. Experience premium gear tailored for your lifestyle.
          </p>
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleClick}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-wrapper">
              <input
                className="form-input"
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                value={details.name}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input
                className="form-input"
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                value={details.email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <div className="input-wrapper">
              <input
                className="form-input"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={details.phone}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                className="form-input"
                id="password"
                name="password"
                placeholder="Min. 8 characters"
                type={showPassword ? "text" : "password"}
                value={details.password}
                onChange={onChange}
                required
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="terms-checkbox">
            <input
              className="form-checkbox"
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the{" "}
              <a href="#" className="terms-link">Terms of Service</a> and{" "}
              <a href="#" className="terms-link">Privacy Policy</a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Signup"}
            <span className="material-symbols-outlined btn-icon">arrow_forward</span>
          </button>
        </form>

        {/* Login Redirect */}
        <p className="login-redirect">
          Already have an account?{" "}
          <button
            className="login-link"
            onClick={navigateToLogin}
          >
            Log in
          </button>
        </p>

        {/* Social Divider */}
        <div className="social-divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with</span>
          <div className="divider-line"></div>
        </div>

        {/* Social Buttons */}
        <div className="social-buttons">
          <button className="social-btn" type="button">
            <span className="material-symbols-outlined">brand_family</span>
            Google
          </button>
          <button className="social-btn" type="button">
            <span className="material-symbols-outlined">brand_family</span>
            Apple
          </button>
        </div>
      </div>
    </main>
  );
}

export default Signup;
