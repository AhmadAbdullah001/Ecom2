import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function GraphicsCards() {
  return (
    <CategoryPageTemplate
      categoryName="Graphics Cards"
      headerBadge="Precision Performance"
      headerTitle="Graphics Cards"
      headerSubtitle="Uncompromising visual fidelity. Explore our selection of high-end GPUs engineered for 4K ray tracing and professional content creation."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDRFds_02z2YJWF438zlYwxZuA6D_PuhplrgAnOmwtYuSM5g-TAEpbTajtsQQ82148JF8JbXfZSEyAHNvevKaUa7E6LihWzbh2HJL8MoWIvZSg2YLjepwnx5Ar8nRSdhJHSPauA--dlp_NV_CWR1GoUAY6ghyJV97ipMudaRE0gKuI9eD9PlwJ3P1zmLFDbefHMeLdw1nOPl0ST98gN3-dpm65pgQNfihHj8OFKzxMBl9naT9FnrT4neAW20CfCtOr3VmDctTgV9umA"
      promo={{
        title: 'Precision Cooling Technology',
        description: 'Experience zero-noise performance even under heavy loads with our custom-engineered vapor chambers.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqJDSZZmdbUTmJL-Rr3WJ808svnFck66rK8Ci4ZRbTBfbuXxdolrdU99_o0IeoJ7U9w0p3p9ZLCze9WLFI5YZkogsRtdbaC-u09drB8lSyFuSYsy-MTawud0cx6Yo4hvzSWe1qg0ijj1OmycZDwQ2x4Aa9OUokoKL7TwqINo4wdTRvPSrsp_eiU_aWDaIZwltz1XZx8qGsBAqf2BG48wnlQFoLcI6I9foCswASaKawqddn5xJsc8k_3W8b6Z-3iZaqD5QHrphBeuFH',
        cta: 'Explore Cooling Tech',
      }}
    />
  );
}
