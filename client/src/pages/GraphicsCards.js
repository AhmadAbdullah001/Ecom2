import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'RTX 4090 FE',
    subtitle: '24GB GDDR6X • NVIDIA Ada Lovelace',
    price: '$1,599.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZZy5kGTazEFmre2RCy0K7MJOnoTzBANGCGxoXeenUtmb5QRM8jSt4jF68IUmuiSs5eah63kZejeSK3Mtlai8cuIpgK-nUza9dQky_nPtj1oNXfCvoGa-NIAyDXr2mXIRiwHmjnTee1ixHP23Vy-yyfGmXzFWfo0VwRzRlH1CdfM1svVRbC3LFyggsFNQxwvPZUP8kxbgWNdbtnVbmwROGSgddMy-rLNmlA5wFzVWuRs5twETWec4CADpnFn1goIksw1YNl5TrZ9XG',
    badge: 'Ultra Tier',
  },
  {
    title: 'RX 7900 XTX',
    subtitle: '24GB GDDR6 • RDNA 3 Architecture',
    price: '$999.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIxzGmLUfmdjOh4zgnSVaPWdXX3cJfEQkeCcYbuQ9a4zlZLYEgGJOuXln8HUQiSTV4WUirg6dYgOIHiP_wTTkFIOa1hQHCMl6GMBhqktiOl1ReN4OytF7w8v9I5kZYpYcEZdBt369UooZ_7RhDNqg_dsL0dor_YADSGXR49n6nG6L_nW6ntGVGbvNNcvP3rMJWllrVXyzWAXu5zNKpWXvd2glknpoOFCULEjURenWuP4NRDRPEuGEwbm6pix_vXUU5n-fdJsYUp_BE',
    badge: 'High Demand',
  },
  {
    title: 'RTX 4080 Super',
    subtitle: '16GB GDDR6X • AI Accelerated',
    price: '$999.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHe2YZpuddt0EdWhH7vyRB1TBgqlDLzSFxG-frTaRLpMpGgxY19vSZvGNTZLlpUZcFLM3H6fmdBZUz9wMEN41oTaxqSgC-WOi7LFdSl-YCHrQwAF8Rr5K2cx1uW-69x0p8NdViIcz8LUP_scUBntimcpPAhZO95L4V2_rUcOgltZZtc7oW2q9YmsDQHEl3MVWw4AlNYJ4B7ocd046FOIUZETjkCK3B6k5XNg8IDFBHchS9Uz6YLeZmuswsRsTOY-azvhkVoi2rkmH',
  },
  {
    title: 'RTX 4070 Ti Super',
    subtitle: '16GB GDDR6X • White Edition',
    price: '$799.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_NJ7z5IbME-yR7cvTkf49J5BaNibu26tXEWrrz01pr-LpTXIMzOeOAAJthhtjEEo5Gov0_JwIPZH7n4vcS50gqZkfF3oz3j6kDisapsTNBWWVf0O4TtQwGjHB2IxVjYXuNhCU-6tsqk2iiG-hWFNqm0jBlA7yoxMQm2ITC6zyw5Tuv6zAEzLr-Q08gQmEQ1dWe2jTnAJRy06BNzixHl_LYOd9A7Jc7oCqO_DJ-EKVkpEme2eEl1riSh7Ih3tcPzMIDLRzdN43Omga',
  },
  {
    title: 'Custom Cooling Promo',
    subtitle: '',
    price: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqJDSZZmdbUTmJL-Rr3WJ808svnFck66rK8Ci4ZRbTBfbuXxdolrdU99_o0IeoJ7U9w0p3p9ZLCze9WLFI5YZkogsRtdbaC-u09drB8lSyFuSYsy-MTawud0cx6Yo4hvzSWe1qg0ijj1OmycZDwQ2x4Aa9OUokoKL7TwqINo4wdTRvPSrsp_eiU_aWDaIZwltz1XZx8qGsBAqf2BG48wnlQFoLcI6I9foCswASaKawqddn5xJsc8k_3W8b6Z-3iZaqD5QHrphBeuFH',
  },
];

export default function GraphicsCards() {
  return (
    <ItemPageTemplate
      headerBadge="Precision Performance"
      headerTitle="Graphics Cards"
      headerSubtitle="Uncompromising visual fidelity. Explore our selection of high-end GPUs engineered for 4K ray tracing and professional content creation."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDRFds_02z2YJWF438zlYwxZuA6D_PuhplrgAnOmwtYuSM5g-TAEpbTajtsQQ82148JF8JbXfZSEyAHNvevKaUa7E6LihWzbh2HJL8MoWIvZSg2YLjepwnx5Ar8nRSdhJHSPauA--dlp_NV_CWR1GoUAY6ghyJV97ipMudaRE0gKuI9eD9PlwJ3P1zmLFDbefHMeLdw1nOPl0ST98gN3-dpm65pgQNfihHj8OFKzxMBl9naT9FnrT4neAW20CfCtOr3VmDctTgV9umA"
      products={sampleProducts.slice(0, 4)}
      promo={{
        title: 'Precision Cooling Technology',
        description: 'Experience zero-noise performance even under heavy loads with our custom-engineered vapor chambers.',
        image: sampleProducts[4].image,
        cta: 'Explore Cooling Tech',
      }}
    />
  );
}
