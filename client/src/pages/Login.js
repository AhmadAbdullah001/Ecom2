import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_HOST } from '../config'
import '../styles/login.css'

function Login(props) {
    const navigate = useNavigate()
    const [details, setdetails] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [stage, setStage] = useState('form') // 'form' or 'verify'
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(0)
    const [resendEnabled, setResendEnabled] = useState(false)

    const onchange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleclick = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_HOST}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose: 'login', email: details.email })
            })
            const note = await res.json()
            if (res.ok) {
                props.showalert('OTP sent to your email. Enter it to login.', 'info')
                setStage('verify')
                startOtpTimer()
                setResendEnabled(false)
                setTimeout(() => setResendEnabled(true), 10000)
            } else {
                props.showalert(note.message || 'Unable to send OTP', 'danger')
            }
        } catch (error) {
            props.showalert('An error occurred. Please try again.', 'danger')
        } finally { setIsLoading(false) }
    }

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
                body: JSON.stringify({ purpose: 'login', email: details.email })
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
        } finally { setIsLoading(false) }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_HOST}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose: 'login', email: details.email, otp })
            })
            const note = await res.json()
            if (res.ok) {
                props.showalert('Login Successful', 'success')
                localStorage.setItem('token', note.token)
                localStorage.setItem('Current', details.email)
                if (rememberMe) localStorage.setItem('rememberMe', 'true')
                navigate('/')
            } else {
                props.showalert(note.message || 'Invalid OTP', 'danger')
            }
        } catch (err) {
            props.showalert('An error occurred. Please try again.', 'danger')
        } finally { setIsLoading(false) }
    }

    const navigateToSignup = () => {
        navigate('/signup')
    }

    return (
        <main className="login-container">
            {/* Atmospheric Background Decoration */}
            <div className="login-background-decoration">
                <div className="decoration-blob decoration-blob-1"></div>
                <div className="decoration-blob decoration-blob-2"></div>
            </div>

            {/* Login Content */}
            <div className="login-content">
                {/* Logo/Brand Section */}
                <div className="login-brand">
                    <h1 className="brand-title">GearUP</h1>
                    <p className="brand-subtitle">Premium Gaming Experience</p>
                </div>

                {/* Authentication Card */}
                <div className="login-card">
                    <div className="login-card-header">
                        <h2 className="login-heading">Welcome Back</h2>
                        <p className="login-subheading">Enter your professional credentials to access your studio profile.</p>
                    </div>

                    <form className="login-form" onSubmit={handleclick}>
                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="name@gearup.com"
                                    value={details.email}
                                    onChange={onchange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password" className="form-label">Password</label>
                                <a href="#" className="forgot-password-link">Forgot Password?</a>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={details.password}
                                    onChange={onchange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {stage === 'form' && (
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending OTP...' : 'Login with OTP'}
                            </button>

                            <div className="divider">
                                <span className="divider-text">OR</span>
                            </div>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={navigateToSignup}
                            >
                                Register
                            </button>
                        </div>
                        )}

                        {stage === 'verify' && (
                            <div className="form-actions">
                                <div className="form-group">
                                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                                    <div className="input-wrapper">
                                        <input id="otp" name="otp" className="form-input" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="otp-meta">
                                    <span className="timer-text">Expires in: {timeLeft > 0 ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}` : '00:00'}</span>
                                    <button type="button" className="btn btn-secondary" onClick={resendOtp} disabled={!resendEnabled || isLoading}>
                                        {isLoading ? 'Resending...' : 'Resend OTP'}
                                    </button>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={verifyOtp} disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify OTP'}</button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer Links */}
                <div className="login-footer">
                    <div className="footer-links">
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <span className="link-separator"></span>
                        <a href="#" className="footer-link">Terms of Service</a>
                        <span className="link-separator"></span>
                        <a href="#" className="footer-link">Support</a>
                    </div>
                    <p className="footer-copyright">© 2024 gameGears. All rights reserved.</p>
                </div>
            </div>
        </main>
    );
}

export default Login
