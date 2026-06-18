import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'NEON Clarity 27-OLED',
    subtitle: '4K • 240Hz • 0.03ms GtG',
    price: '$899',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRAHztxTv8bnAtNY79zWPPZbTvsYEwkvNViURBXjOAaNHOpK6ZlBUcjrNJd6HS34_H1Af5cb1i88aZ3OVPgq04b3JP8VJ3vxluWtAKMM4X-6lmEjsia108UKOnLONEqz6om-52R4zcmaluDHr9QJKlTajRn7vTszt9iG6gWRG7AIYAp0Ode6DmJhazv_HtGO8-aq6oH1dNqE9AUULEJb5OjueNcz6UyVxMHrnAPLrSM_4kq_Ea9FWrvhzH8Q_bsdHnBanIpmWRpTiy',
    badge: 'New Arrival',
  },
  {
    title: 'Apex 32-UHD',
    subtitle: '4K • 144Hz • IPS Black',
    price: '$749',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7xTmo13NpjDhECoRxvQloALcgRJHvH3S4HXhE19ZBTiSSr_XXviKwtyz3t8wHJAg_fWYgUJP9X0Sryb9YJ2LEXq_mLmeK_v07m9ByJ8ZkrR7PgpG1AZY3UbWHXw2DV_vEg8p90k1B1PPNac_Oi5EzRemMuKpINXAXxBdAIiqRsjMQ0w0GL7PcNXzb_2LrfLUQvdwuI4OF8D10tMT9Kv0slp6F-KtyLMeMMYGTg_TT6GnjS1XFi32smeoS_jwzeMNC4nlbSVr7Bekz',
    badge: 'Creator',
  },
  {
    title: 'Studio Link 24',
    subtitle: 'QHD • 75Hz • 100% sRGB',
    price: '$329',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbrmiTHfPDT8STfUquZY-IWPZmo2PfCji0__xKhUexZqFmGU64h-oNMYbmlkyFS6oc_7DgM-9JmBB2mzldMz0q2IJRN5CO02aHfw5F2jhKnB72oobk9Y5I_2Ye3SK6i63kzG4T-Dwfv0xts9JEHRRpQmz08YDl0WwETVzwWq5G4ZlDmCsxOBhHzc3MAsmSBHiSBCqURkj5nuOM88nx-rMsLkoLUzXHIxc9jHVNU0kdt5aQc0nQ3ExaeSYtlUId5qUMLZhsJDGkg8WK',
    badge: 'Professional',
  },
  {
    title: 'UltraCurve 38 Pro',
    subtitle: 'WQHD+ • 165Hz • Nano IPS',
    price: '$1,199',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2FamVRzPO5SHXNnLpe0BHJ4KiE8l8fMuhk80kaZmn0hzx1Wvoaik57CDMkM4ImdAPGTVKswq015Gbyn4QL5hGu38csN_I8TqYV3EeYgGtGFAj8WjQLqZHpt6PLLPpls8HGVyXVGoVpU6MeXlTRSoXt6i7AAR5hUCceAPlMfKfwHfctaRYkMA9v5sKCqBg6ssMZkSeMoA68irYf7UJ7ZULfXb6MNtuH-3cDfiZ2uA_sqgRTKBZ3pe9VE9OEN96h6xIVQYXfj4s8OjI',
    badge: 'Limited Edition',
  },
  {
    title: 'Vision 27-C',
    subtitle: '4K • 60Hz • Delta E < 1',
    price: '$649',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWEnznWEvfqkf5olgfjh04eD15_7hbH_lQO0-qMdEMXUthHITMxGlA32tPXXve2UoIGdEtIJKB5KIXOA2yRVuUmOhRDkq5yngzbT_lhoAUy39LOQCW9e2-3kKh2e5clF65ATyvNBbvZpc7aeX8eKcGjuIEuSK52HW6QH8IWCukDZY78-PtK2DF0C4TOM8g9jd3UjBXkpa5tJp9CGvOGlPzdXOVNyfJClAcdPpKpAECLfcJsLibajyNrQYA4dIiZtJbWpjwzkVEmrEC',
    badge: 'Color Accurate',
  },
  {
    title: 'Velocity 27-G',
    subtitle: 'FHD • 360Hz • Fast IPS',
    price: '$499',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZK1M1SWU9WGDWl4SyNFB5a2dUODKqydFM6gKnFpCbiGYHXQJc74hib87iySHTKZVmeQ62l-SAEuW57mittsptBxvCcfp1b7PF3SluM5z91jj1q3KUqv8vtWhmXnCZNdpqCci3LzKpjVRrZusiCMs66hlABgfynVBX0K3r8XhmZN1NvP1TwVwZd7lGqnXf3ajR-lN2BrwVz9nRrV9B8TUiMbYqH5zY-EMQiZGoCyNPPzBqlgKOv1ZdQaPPEqGYCx6McN2gelsZcQFO',
    badge: 'Esports',
  },
];

export default function Monitors() {
  return (
    <ItemPageTemplate
      headerBadge="Precision Displays"
      headerTitle="Precision Visuals"
      headerSubtitle="Engineered for absolute clarity. Discover our curated collection of 4K OLED, ultrawide, and high-refresh monitors designed for the studio and the arena."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuCJXmQP1HfllO18wDwmtwieUusUkdmq1Gcws-NGflNTDWFXLxnRNqw1h1VEme_zi6VozN0pHTlwP4TWWV_VeJp-zmx0VImo3moKnpexXQF952htzMqMtEWfUG95yuYk5Qpma9TL4ePdhyhsjWwz5F6ECA5Eco50hGbNvP6QOVfZ2hv3SOW5mNWF58Tn04vqqFXyJVdOJmVEvEqjX6P1ZHaQpm1T4Fx0kseeVEP8-GJLOb75U0TGdXwWDm6SR1aKPDOg0jSRcsiYtnUS"
      products={sampleProducts}
      promo={{
        title: 'NEON UltraCurve 49"',
        description:
          'Experience true immersion with a 49-inch ultrawide OLED panel featuring a 5120 × 1440 resolution and an ultra-smooth 240Hz refresh rate.',
        image: sampleProducts[3].image,
        cta: 'Explore Ultrawide',
      }}
    />
  );
}