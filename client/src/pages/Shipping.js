import React from 'react';
import StaticPage from './StaticPage';

export default function Shipping() {
  return (
    <StaticPage
      title="Shipping Information"
      description="Everything you need to know about shipping, delivery timelines, and order tracking."
      sections={[
        {
          heading: 'Fast Delivery',
          content: [
            'Orders are processed within 1-2 business days, with standard and expedited shipping options available.',
            'Track your package using the details sent to your email once your order ships.',
          ],
        },
        {
          heading: 'International Shipping',
          content: [
            'We deliver worldwide. Customs and duties may vary by region, so please review local regulations before purchase.',
            'Contact our support team if you need help with international delivery or custom requirements.',
          ],
        },
      ]}
    />
  );
}
