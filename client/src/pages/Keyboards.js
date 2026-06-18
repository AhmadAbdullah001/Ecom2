import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'AXIOM-75 Pro',
    subtitle: 'Wireless • Gasket-Mount • 75% Layout',
    price: '$289',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfHcLJtWVm-ZEviXmlSF6v8lDdAAUTODIPIaVC3-mtw2dny1DqSByasjLoNF2yDQa6_knqo_IufjUeeTnlAhABQg-m4wr2lTGOpcc7kPv774fAw3rxSomQeInlMSlqPzCadp_nQhtRKDx1Cb8S_1Qf-dZnXP8o8Y07dPFLafD0vul1ij-UOh_sonb_AGhZTYWiLOP2VFMTDQUZAEcVUXq2Vzz-xndXewIueroXyhtNp_vt63F59IX4QAlHduZEZd3n3rhrN4xFBBw-',
    badge: 'New',
  },
  {
    title: 'VORTEX Custom',
    subtitle: 'Limited Edition • Custom Build',
    price: '$415',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIvV8pctUM2l9w54ZTZcNeTrEbvnlUoUoKeqoMcRDE1_maz_ZGXskzswfnR-AyT03Yjq26cZk6bMRPAqfDcw2voxouMt_G_HG78S6wIwdmsrI19rfefRt1L0g9Tk7SwxHtOivQVvRISI96Wtq4sBDggDfaXX3_4xL24S7VQamHjXoEFYp3OYqHmnBaM-4ycXosQZvTa2_jEDvfMXjEO6BabOsEiFvHmAdNopZjj9QNYGKeZYi_2BUAE6wsX_dmG6dTZKGGPWXfF_5C',
    badge: 'Limited Edition',
  },
  {
    title: 'ELEMENT-100',
    subtitle: 'Full Size • Aluminum Chassis',
    price: '$210',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5sR70AFcvg4W0PjiE_tfVD2APknuiMUc6M_Oy-GYEu55tkiV5RtmvQ8iOU6r7tsfcxav3ahwZnZJX3UzayGQHDyQe3ttBgc-L85DdYGywfVpSWy90S8Q4r5ARlXsCSxmC3yfMkXBwR-pssE7PcqnIbOEeG7ACG7vFYkJHfX9L-p1qLSgbnPUz2lKfAxKkAGbv3ipEwwLfV7DdyFDw9B7JKw2dmnKLtQE2d1djK9XK7JPLupwNYX1nkHCJNfkIgqIgVZGfDUFyAxpm',
    badge: 'Aluminum',
  },
  {
    title: 'ORGANIC-65',
    subtitle: '65% Layout • Walnut Finish',
    price: '$345',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQnNp0kJaePiADUwwPZMmZ6CmeFKuJgLDv_f7j3SmlXpPNO8KVvu1-zZFfYupyYy4hYN_WATDLDCNMIgWMtco8jp4gdoFxP8jP8W5mNgsDL1RyjZg1sjyJfEVXPnV12wxxejU0b89tpBhJNOGYvaj9PCvrQpla4p2ICTbw1oGOpePZ8_l1WAsT3D2XKv2owCAJmoEZ9fe0H0NyAl_eoredMiAWHzX0otCk9fz3OgnlfpMkaHG-qMrNloocDhI7FvJHXZpkWHXqsC_C',
    badge: 'Premium Wood',
  },
];

export default function Keyboards() {
  return (
    <ItemPageTemplate
      headerBadge="Engineered Precision"
      headerTitle="Elevate Your Input Experience"
      headerSubtitle="Our keyboards are precision-tuned instruments designed for developers, designers, and enthusiasts who demand absolute reliability."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuAZoF-uFcuIiFzRm3ZTYEBiknTpGVixd2KSc8k2VlD8NA3Hg54hxANh0iGjR7yMKB9XwpSW4yhPbJv4enWu3ZUxyoSDSmBgJ0wre180j3D8w_Yw3BVDKzeHHDTp2q1K-_sS5MjYvKOuZ4Km5mrwFftn07UAbvJSFrAmOqEU-rhZqxAhB4zHaNNP67Ufss6gumyMuQL-iXXpfxRzWcDTNGVYCM1AuvOaboIqHQnvOrr3CgZSYPqLEKHGc0IWSrBYl0rrS6MHAR8k5YEo"
      products={sampleProducts}
      promo={{
        title: 'Mechanical Excellence',
        description:
          'Discover premium mechanical keyboards featuring precision switches, gasket-mounted designs, and enthusiast-grade craftsmanship.',
        image: sampleProducts[0].image,
        cta: 'Explore Keyboards',
      }}
    />
  );
}