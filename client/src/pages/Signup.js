import React, { useState, useEffect } from "react";
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
  const [stage, setStage] = useState('form') // 'form' or 'verify'
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [resendEnabled, setResendEnabled] = useState(false)

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

    try {
      const res = await fetch(`${API_HOST}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: 'signup',
          email: details.email,
          name: details.name,
          phone: details.phone,
          password: details.password,
          address: ''
        })
      })
      const note = await res.json()
      if (res.ok) {
        props.showalert('OTP sent to your email. Enter it to complete signup.', 'info')
        setStage('verify')
        startOtpTimer()
        setResendEnabled(false)
        setTimeout(() => setResendEnabled(true), 10000)
      } else {
        props.showalert(note.message || 'Unable to send OTP', 'danger')
      }
    } catch (err) {
      props.showalert('An error occurred. Please try again.', 'danger')
    } finally {
      setIsLoading(false)
    }
  };

  const startOtpTimer = () => {
    setTimeLeft(300)
  }

  useEffect(() => {
    if (stage !== 'verify') return
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [stage, timeLeft])

  const resendOtp = async () => {
    if (!details.email) {
      props.showalert('Email is required to resend OTP', 'warning')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(`${API_HOST}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purpose: 'signup', email: details.email })
      })
      const note = await res.json()
      if (res.ok) {
        props.showalert('OTP resent to your email.', 'info')
        startOtpTimer()
        setResendEnabled(false)
        setTimeout(() => setResendEnabled(true), 10000)
      } else {
        props.showalert(note.message || 'Unable to resend OTP', 'danger')
      }
    } catch (err) {
      props.showalert('An error occurred. Please try again.', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

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
        {stage === 'form' && (
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
        )}

        {stage === 'verify' && (
          <form className="signup-form" onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)
            try {
              const res = await fetch(`${API_HOST}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose: 'signup', email: details.email, otp })
              })
              const note = await res.json()
              if (res.ok) {
                props.showalert('Signup complete', 'success')
                localStorage.setItem('token', note.token)
                navigate('/')
              } else {
                props.showalert(note.message || 'Invalid OTP', 'danger')
              }
            } catch (err) {
              props.showalert('An error occurred. Please try again.', 'danger')
            } finally { setIsLoading(false) }
          }}>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <div className="input-wrapper">
                <input id="otp" name="otp" className="form-input" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
              </div>
            </div>
            <div className="otp-meta">
              <span className="timer-text">Expires in: {timeLeft > 0 ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}` : '00:00'}</span>
              <button type="button" className="btn btn-secondary" onClick={resendOtp} disabled={!resendEnabled || isLoading}>{isLoading ? 'Resending...' : 'Resend OTP'}</button>
            </div>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify OTP'}</button>
          </form>
        )}

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
