import React from 'react';
import '../styles/home.css';

export default function StaticPage({ title, description, sections }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="home-eyebrow">GearUP</span>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="home-actions">
              <a className="home-btn home-btn-primary" href="/">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-products">
        <div className="home-shell">
          {sections.map((section) => (
            <div key={section.heading} className="home-tech-item" style={{ marginBottom: '24px' }}>
              <h2>{section.heading}</h2>
              {section.content.map((paragraph, index) => (
                <p key={index} style={{ maxWidth: '720px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
