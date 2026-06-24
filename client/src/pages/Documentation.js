import React from 'react';
import StaticPage from './StaticPage';

export default function Documentation() {
  return (
    <StaticPage
      title="Documentation"
      description="Find setup instructions, compatibility guides, and pro tips for your Neon Gear system."
      sections={[
        {
          heading: 'Getting Started',
          content: [
            'Browse our product manuals, quick start guides, and hardware compatibility notes to get set up quickly.',
            'Learn how to connect peripherals, configure your system, and maximize performance with recommended settings.',
          ],
        },
        {
          heading: 'Support Resources',
          content: [
            'Explore our knowledge base for troubleshooting, firmware updates, and configuration tutorials.',
            'Reach out to our team through the Contact page when you need dedicated assistance.',
          ],
        },
      ]}
    />
  );
}
