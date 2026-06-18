import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'Wireless Hi-Fi Ultra',
    subtitle: '24-bit Lossless • ANC • 80 Hours',
    price: '$449.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnTO_asCaXxUrjzYUkNfWpqTzDeA0-LhX0iIFhjsn3EhQXsXYpPr2XhJRCDD5VkkNmGxDeF_7IFtljDZilPq6nuKD4eld0DIasQKf-3n7yw23QaXe8lxsUIrSxMXojgTHx7TlwJhFKnGc6bs6V3s2jNx_Nm32uxnOcpi1ug5iTKSPLJNrgvX_WcWyJsC2fj_qVOmNrPksaL_yghixT894tclRvtmkj3FIjGpOca7cy7OiHTzsNlr3N-Kqudk4ehnSGxJ-KmGNRbsbt',
    badge: 'Flagship Series',
  },
  {
    title: 'Gaming Surround V2',
    subtitle: '7.1 Spatial Audio • Dual-Mode',
    price: '$189.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLRkzK7CyUOYDwr1WrSZWoAytKOhzACqma7ASUjPQvjHF3vXQgl3SN6XvQKRS4ab1Kan9FGd8NLCMy3dV3gDd8dICzaclqVASKZy5upjMqIjbc_q276chEOLIOudzzQRpwKI5uxERF_-ISS7D5sRB5uNBx7phvhmOQjUDJy17pY-sxmvqEbJo9y55EN3mVKyHlukruiLMQhwdggnfOtiT9KjFRF4I14CrOvVPSMPK-EzJYYkcfwi_yFFbcNfb7BQBEKHkX_e9v3rSg',
    badge: 'Gaming',
  },
  {
    title: 'Studio Monitor M-10',
    subtitle: 'Open-Back • Flat Response',
    price: '$299.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3FaP4CVEKPdFnpoBchuXwKg8xUMX3bYyJRMyb-58dnxfeiIHaZNQHgNQ72_djcB0TY8QefHoUhhRqzji5ojlRFEer3UWT0tMn36OFH7BBO_4f_5CU9Bf_QMS4HXXetLhVaX998BrciDjRBmHtXDt0SnbPERwxGGoFN4vxxvtz14-wBquA7-E86jlLzUh4fvSMP0SJ9iue1pjXLmoeZMmDmQsYPvLgzblS77MUeDSAOP8VjghxpOS2gUP-miBxE7LtNYd9L_qh5UZM',
    badge: 'Studio',
  },
  {
    title: 'Spatial One Pro',
    subtitle: '360° Audio • Wireless • ANC',
    price: '$349.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABwQWj6lGMDWm4BTsT72lStR91l-fG3iTqGKJOYhlYM_ToscZ-u0DzyKcE4PTLorl-YTlnQ6WRbpAPz4VyiqbNduR3XLS7FwzJtDZ1XHA-5bdxkpS8Ryh6BAvrvfku1DCNRM8c6auK9TKCWj6Q9McFnYbAGcKF7GZJMgOLLUlXnaZ6aIeN1B_zAyb33_6c0fy_038ScqJhQRfBwr3Icsy9KsKLDUOzVJNvrbyag-W1ZUhlh2RTIUPOn6nLkfbXB97_8es1IaT9Ci3X',
    badge: 'Premium Audio',
  },
];

export default function Headsets() {
  return (
    <ItemPageTemplate
      headerBadge="Premium Audio"
      headerTitle="Acoustic Architecture."
      headerSubtitle="Experience sound as it was intended. From the studio floor to the digital arena, our headsets redefine precision listening."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuABwQWj6lGMDWm4BTsT72lStR91l-fG3iTqGKJOYhlYM_ToscZ-u0DzyKcE4PTLorl-YTlnQ6WRbpAPz4VyiqbNduR3XLS7FwzJtDZ1XHA-5bdxkpS8Ryh6BAvrvfku1DCNRM8c6auK9TKCWj6Q9McFnYbAGcKF7GZJMgOLLUlXnaZ6aIeN1B_zAyb33_6c0fy_038ScqJhQRfBwr3Icsy9KsKLDUOzVJNvrbyag-W1ZUhlh2RTIUPOn6nLkfbXB97_8es1IaT9Ci3X"
      products={sampleProducts}
      promo={{
        title: 'Wireless Hi-Fi Ultra',
        description:
          'Experience lossless 24-bit audio, active noise isolation, and up to 80 hours of battery life in our flagship wireless headset.',
        image: sampleProducts[0].image,
        cta: 'Explore Headsets',
      }}
    />
  );
}