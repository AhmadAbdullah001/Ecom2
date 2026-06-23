import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Monitors() {
  return (
    <CategoryPageTemplate
      categoryName="Monitors"
      headerBadge="Precision Displays"
      headerTitle="Precision Visuals"
      headerSubtitle="Engineered for absolute clarity. Discover our curated collection of 4K OLED, ultrawide, and high-refresh monitors designed for the studio and the arena."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuCJXmQP1HfllO18wDwmtwieUusUkdmq1Gcws-NGflNTDWFXLxnRNqw1h1VEme_zi6VozN0pHTlwP4TWWV_VeJp-zmx0VImo3moKnpexXQF952htzMqMtEWfUG95yuYk5Qpma9TL4ePdhyhsjWwz5F6ECA5Eco50hGbNvP6QOVfZ2hv3SOW5mNWF58Tn04vqqFXyJVdOJmVEvEqjX6P1ZHaQpm1T4Fx0kseeVEP8-GJLOb75U0TGdXwWDm6SR1aKPDOg0jSRcsiYtnUS"
      promo={{
        title: 'NEON UltraCurve 49"',
        description:
          'Experience true immersion with a 49-inch ultrawide OLED panel featuring a 5120 × 1440 resolution and an ultra-smooth 240Hz refresh rate.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2FamVRzPO5SHXNnLpe0BHJ4KiE8l8fMuhk80kaZmn0hzx1Wvoaik57CDMkM4ImdAPGTVKswq015Gbyn4QL5hGu38csN_I8TqYV3EeYgGtGFAj8WjQLqZHpt6PLLPpls8HGVyXVGoVpU6MeXlTRSoXt6i7AAR5hUCceAPlMfKfwHfctaRYkMA9v5sKCqBg6ssMZkSeMoA68irYf7UJ7ZULfXb6MNtuH-3cDfiZ2uA_sqgRTKBZ3pe9VE9OEN96h6xIVQYXfj4s8OjI',
        cta: 'Explore Ultrawide',
      }}
    />
  );
}