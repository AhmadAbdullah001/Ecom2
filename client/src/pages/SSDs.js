import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function SSDs() {
  return (
    <CategoryPageTemplate
      categoryName="SSDs"
      headerBadge="High-Speed Storage"
      headerTitle="High-Performance Storage"
      headerSubtitle="Precision-engineered solid state drives designed for relentless speed and absolute data integrity. From NVMe Gen5 breakthroughs to high-capacity enterprise SATA solutions."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuADqHnzhX8GLRL7tmok054ueFm_ml274Rn6B88ZD7Ng4KGVr10qgu6eHTqKqXjiZtFI-x7uA88Vd82H8A6xGjjU3jY4jP4Q8fObB8mRF8u1DOJxQcge8H9zoozF63V_W5BoKOGVh6U0DllZfziiC4t6_0Awn84pdkF37stG8B7lX10rSP4b4pQsaRjFr-q9xSkkiW6L_VeGqDaBlG4SvOYrrO2BtfHtx_8gu2x2jW6jGCDvqCaPDcZHYpr8Aj6lWsEccrVFou7yjOpk"
      promo={{
        title: 'V-X Alpha Gen5 NVMe',
        description:
          'Experience next-generation performance with blazing-fast 14,500 MB/s speeds powered by PCIe Gen5 technology.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADqHnzhX8GLRL7tmok054ueFm_ml274Rn6B88ZD7Ng4KGVr10qgu6eHTqKqXjiZtFI-x7uA88Vd82H8A6xGjjU3jY4jP4Q8fObB8mRF8u1DOJxQcge8H9zoozF63V_W5BoKOGVh6U0DllZfziiC4t6_0Awn84pdkF37stG8B7lX10rSP4b4pQsaRjFr-q9xSkkiW6L_VeGqDaBlG4SvOYrrO2BtfHtx_8gu2x2jW6jGCDvqCaPDcZHYpr8Aj6lWsEccrVFou7yjOpk',
        cta: 'Explore SSDs',
      }}
    />
  );
}