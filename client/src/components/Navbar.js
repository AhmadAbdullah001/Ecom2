import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isComponentsOpen, setIsComponentsOpen] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsComponentsOpen(false);
  };

  const componentLinks = [
    { label: "Graphics Cards", icon: "developer_board", path: "/graphics" },
    { label: "Processors", icon: "memory", path: "/processors" },
    { label: "Motherboards", icon: "developer_board", path: "/motherboards" },
    { label: "RAM", icon: "memory_alt", path: "/ram" },
    { label: "SSDs", icon: "hard_drive", path: "/ssds" },
    { label: "Monitors", icon: "monitor", path: "/monitors" },
    { label: "Keyboards", icon: "keyboard", path: "/keyboards" },
    { label: "Mice", icon: "mouse", path: "/mice" },
    { label: "Headsets", icon: "headphones", path: "/headsets" },
  ];

  const goToProfile = () => {
    closeMenu();
    nav("/profile");
  };

  return (
    <header className="navbar-container">
      <nav className="navbar-wrapper">
        <div className="navbar-brand-group">
          <button
            className={`navbar-menu-button ${isMobileMenuOpen ? "active" : ""}`}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <Link to="/" className="logo-brand" onClick={closeMenu}>
            <span className="logo-text">GearUP</span>
          </Link>
        </div>

        <div className="navbar-links-desktop">
          <Link to="/" className={`nav-link ${loc.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>

          <div className="nav-dropdown">
            <button
              className="nav-link nav-dropdown-trigger"
              type="button"
              onClick={() => setIsComponentsOpen(!isComponentsOpen)}
              aria-expanded={isComponentsOpen}
            >
              Components
              <span className="material-symbols-outlined">expand_more</span>
            </button>

            {isComponentsOpen && (
              <div className="nav-dropdown-menu">
                {componentLinks.map((link) => (
                  <Link
                    className="nav-dropdown-item"
                    key={link.label}
                    to={link.path}
                    onClick={closeMenu}
                  >
                    <span className="material-symbols-outlined">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className={`nav-link ${loc.pathname === "/contact" ? "active" : ""}`}>
            Support
          </Link>

        </div>

        <div className="navbar-auth-desktop">
          {!isLoggedIn ? (
            <Link to="/login" className="navbar-login-btn">
              Login
            </Link>
          ) : (
            <button
              className="navbar-avatar-btn"
              type="button"
              onClick={goToProfile}
              aria-label="Open profile"
            >
              <span className="material-symbols-outlined">person</span>
            </button>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <Link
            to="/"
            className={`mobile-nav-link ${loc.pathname === "/" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          <button
            className="mobile-nav-link mobile-components-trigger"
            type="button"
            onClick={() => setIsComponentsOpen(!isComponentsOpen)}
          >
            Components
            <span className="material-symbols-outlined">expand_more</span>
          </button>

          {isComponentsOpen && (
            <div className="mobile-components-list">
              {componentLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="mobile-component-link"
                  onClick={closeMenu}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/contact"
            className={`mobile-nav-link ${loc.pathname === "/contact" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Support
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="mobile-auth-btn" onClick={closeMenu}>
              Login
            </Link>
          ) : (
            <button className="mobile-auth-btn" type="button" onClick={goToProfile}>
              Profile
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
