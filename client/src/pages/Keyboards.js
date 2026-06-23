import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Keyboards() {
  return (
    <CategoryPageTemplate
      categoryName="Keyboards"
      headerBadge="Engineered Precision"
      headerTitle="Elevate Your Input Experience"
      headerSubtitle="Our keyboards are precision-tuned instruments designed for developers, designers, and enthusiasts who demand absolute reliability."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuAZoF-uFcuIiFzRm3ZTYEBiknTpGVixd2KSc8k2VlD8NA3Hg54hxANh0iGjR7yMKB9XwpSW4yhPbJv4enWu3ZUxyoSDSmBgJ0wre180j3D8w_Yw3BVDKzeHHDTp2q1K-_sS5MjYvKOuZ4Km5mrwFftn07UAbvJSFrAmOqEU-rhZqxAhB4zHaNNP67Ufss6gumyMuQL-iXXpfxRzWcDTNGVYCM1AuvOaboIqHQnvOrr3CgZSYPqLEKHGc0IWSrBYl0rrS6MHAR8k5YEo"
      promo={{
        title: 'Mechanical Excellence',
        description:
          'Discover premium mechanical keyboards featuring precision switches, gasket-mounted designs, and enthusiast-grade craftsmanship.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfHcLJtWVm-ZEviXmlSF6v8lDdAAUTODIPIaVC3-mtw2dny1DqSByasjLoNF2yDQa6_knqo_IufjUeeTnlAhABQg-m4wr2lTGOpcc7kPv774fAw3rxSomQeInlMSlqPzCadp_nQhtRKDx1Cb8S_1Qf-dZnXP8o8Y07dPFLafD0vul1ij-UOh_sonb_AGhZTYWiLOP2VFMTDQUZAEcVUXq2Vzz-xndXewIueroXyhtNp_vt63F59IX4QAlHduZEZd3n3rhrN4xFBBw-',
        cta: 'Explore Keyboards',
      }}
    />
  );
}