import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_HOST } from '../config'
import '../styles/login.css'

function Login(props) {
    const navigate = useNavigate()
    const [details, setdetails] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const onchange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleclick = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const res = await fetch(`${API_HOST}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: details.email, password: details.password })
            })
            const note = await res.json();
            
            if (note.flag === true) {
                props.showalert('Login Successful', 'success')
                localStorage.setItem('token', note.authToken)
                localStorage.setItem('Current', details.email)
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true')
                }
                navigate('/')
            }
            else {
                props.showalert('Invalid Credentials', 'danger')
            }
        } catch (error) {
            props.showalert('An error occurred. Please try again.', 'danger')
        } finally {
            setIsLoading(false)
        }
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
                    <h1 className="brand-title">gameGears</h1>
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
                                    placeholder="name@neon-gear.com"
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

                        {/* Remember Me Checkbox */}
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="maintain"
                                name="maintain"
                                className="form-checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="maintain" className="checkbox-label">Maintain Persistent Link</label>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Authenticating...' : 'Login'}
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
