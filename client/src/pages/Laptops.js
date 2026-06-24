import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Laptops() {
  return (
    <CategoryPageTemplate
      categoryName="Laptops"
      headerBadge="Portable Performance"
      headerTitle="Laptops"
      headerSubtitle="Ultra-thin, powerful systems built for creative professionals, developers, and mobile productivity warriors."
      heroImg="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80"
      promo={{
        title: 'Compact Powerhouses',
        description: 'Experience desktop-class performance in thin-and-light designs optimized for mobility and reliability.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        cta: 'Explore Mobile Systems',
      }}
    />
  );
}
