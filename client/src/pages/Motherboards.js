import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Motherboards() {
  return (
    <CategoryPageTemplate
      categoryName="Motherboards"
      headerBadge="Platform Architecture"
      headerTitle="Precision Foundations"
      headerSubtitle="High-performance motherboards engineered for stability, expandability, and lightning-fast data transfer. Choose from Intel LGA, AMD AM5, and specialized form factors."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuCYW1SpiEDPiYrr9OaWO19zZn8UqPtEbby6CtBqnG4txKZiuSPmmENQbPNnCafZhqixtqWBpzakKHeEqZUCjW6SojU14jcoKWjz81io2_Cr6RD_sM7K0bkpHG5MNZ88L2X0EQz8E29rYOVomXXD2mUfqNNVBXPnoPmYYAwRXAjQpcP_jSj1ktrHJzNN8xK9d7V6Z_mvdW10pic-2QO8Ue1za-drzdrvcPEOpJkTu_n33hWVxwHY07F9lqF8oG1qlsydD_rGPNrOLm1I"
      promo={{
        title: 'Apex Dominator Z790',
        description: 'Experience ultimate platform performance with PCIe 5.0 support, premium VRM, and comprehensive connectivity.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYW1SpiEDPiYrr9OaWO19zZn8UqPtEbby6CtBqnG4txKZiuSPmmENQbPNnCafZhqixtqWBpzakKHeEqZUCjW6SojU14jcoKWjz81io2_Cr6RD_sM7K0bkpHG5MNZ88L2X0EQz8E29rYOVomXXD2mUfqNNVBXPnoPmYYAwRXAjQpcP_jSj1ktrHJzNN8xK9d7V6Z_mvdW10pic-2QO8Ue1za-drzdrvcPEOpJkTu_n33hWVxwHY07F9lqF8oG1qlsydD_rGPNrOLm1I',
        cta: 'Explore Motherboards',
      }}
    />
  );
}
