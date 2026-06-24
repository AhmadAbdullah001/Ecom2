import React from 'react';
import StaticPage from './StaticPage';

export default function Compliance() {
  return (
    <StaticPage
      title="Compliance"
      description="Understand how Neon Gear complies with global hardware and data standards." 
      sections={[
        {
          heading: 'Regulatory Standards',
          content: [
            'Our products meet applicable safety and electromagnetic compliance requirements for consumer electronics.',
            'We continuously monitor standards updates to ensure our offerings remain compliant in supported regions.',
          ],
        },
        {
          heading: 'Environmental Responsibility',
          content: [
            'Neon Gear supports responsible packaging and recycling practices for hardware components.',
            'Contact support if you require product compliance documentation or certifications.',
          ],
        },
      ]}
    />
  );
}
