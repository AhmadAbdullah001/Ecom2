import React from 'react';
import StaticPage from './StaticPage';

export default function ReturnPolicy() {
  return (
    <StaticPage
      title="Return Policy"
      description="Review our return and refund process for purchases made through GearUP." 
      sections={[
        {
          heading: '30-Day Returns',
          content: [
            'Products may be returned within 30 days of delivery for a full refund, provided they are in original condition.',
            'Return shipping instructions will be provided after you submit a return request through our support channel.',
          ],
        },
        {
          heading: 'Refund Process',
          content: [
            'Once your return is received and inspected, refunds are issued to the original payment method within 5-7 business days.',
            'Contact support if you have questions about refund timing or if your return is delayed.',
          ],
        },
      ]}
    />
  );
}
