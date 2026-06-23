import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Headsets() {
  return (
    <CategoryPageTemplate
      categoryName="Headsets"
      headerBadge="Premium Audio"
      headerTitle="Acoustic Architecture."
      headerSubtitle="Experience sound as it was intended. From the studio floor to the digital arena, our headsets redefine precision listening."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuABwQWj6lGMDWm4BTsT72lStR91l-fG3iTqGKJOYhlYM_ToscZ-u0DzyKcE4PTLorl-YTlnQ6WRbpAPz4VyiqbNduR3XLS7FwzJtDZ1XHA-5bdxkpS8Ryh6BAvrvfku1DCNRM8c6auK9TKCWj6Q9McFnYbAGcKF7GZJMgOLLUlXnaZ6aIeN1B_zAyb33_6c0fy_038ScqJhQRfBwr3Icsy9KsKLDUOzVJNvrbyag-W1ZUhlh2RTIUPOn6nLkfbXB97_8es1IaT9Ci3X"
      promo={{
        title: 'Wireless Hi-Fi Ultra',
        description:
          'Experience lossless 24-bit audio, active noise isolation, and up to 80 hours of battery life in our flagship wireless headset.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnTO_asCaXxUrjzYUkNfWpqTzDeA0-LhX0iIFhjsn3EhQXsXYpPr2XhJRCDD5VkkNmGxDeF_7IFtljDZilPq6nuKD4eld0DIasQKf-3n7yw23QaXe8lxsUIrSxMXojgTHx7TlwJhFKnGc6bs6V3s2jNx_Nm32uxnOcpi1ug5iTKSPLJNrgvX_WcWyJsC2fj_qVOmNrPksaL_yghixT894tclRvtmkj3FIjGpOca7cy7OiHTzsNlr3N-Kqudk4ehnSGxJ-KmGNRbsbt',
        cta: 'Explore Headsets',
      }}
    />
  );
}