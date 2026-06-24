import React from 'react';
import StaticPage from './StaticPage';

export default function Terms() {
  return (
    <StaticPage
      title="Terms of Service"
      description="Review the terms governing your purchase and use of Neon Gear products." 
      sections={[
        {
          heading: 'User Obligations',
          content: [
            'By using our site, you agree to purchase products in accordance with the terms and conditions listed here.',
            'Ensure that all account and payment information is accurate and up to date.',
          ],
        },
        {
          heading: 'Service Terms',
          content: [
            'We reserve the right to update product availability, pricing, and shipping terms at any time.',
            'Orders are subject to acceptance and availability. We will notify you if an item cannot be fulfilled.',
          ],
        },
      ]}
    />
  );
}
