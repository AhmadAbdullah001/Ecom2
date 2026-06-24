import React from 'react';
import StaticPage from './StaticPage';

export default function Privacy() {
  return (
    <StaticPage
      title="Privacy Policy"
      description="Learn how we collect, use, and protect your information when you shop with GearUP."
      sections={[
        {
          heading: 'Data Use',
          content: [
            'We use customer information only to process orders, provide support, and improve our services.',
            'We do not sell your personal data to third parties.',
          ],
        },
        {
          heading: 'Security',
          content: [
            'All sensitive data is encrypted in transit. Account and payment details are protected with industry-standard security practices.',
            'Reach out via the Contact page if you have any privacy questions or requests.',
          ],
        },
      ]}
    />
  );
}
