import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'Velocity X DDR5',
    subtitle: '7200MHz • 32GB (2x16) • CL34',
    price: '$219.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1DJxkFRDC4kbV9DVrgKdNG_JfraE8C0pI-s6WQ14jczjHKPitwjGT-m382HG26kxauzJC38D_vCvegIsPOLJKjtwFdZ8geiiQT4EJ25rlCQ__ZQmlXqH-5u11z-RiqV6sTRaC9R6vT1CiKaHu5eiL_SEkQfMWaNnccBap2weGv_gRpEUuK-jKx5mRhLn0G3w3KoQ-O9uw_lAnOFcrhE-XN9SE9sS3CXRZiGG2F8us5eBYtTO-1F9z2XlJVkF_1a9RdixNKQshIovK',
    badge: '15% OFF',
  },
  {
    title: 'Studio Pro Memory',
    subtitle: '6000MHz • 64GB (2x32) • CL30',
    price: '$289.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIioZ7s0LktCWBXI9mokeda-e7VbZya72ALIYn2UAbOxi9gyGrG5Dr8mpLqRGXZg1GAqz9JgRxdHPLcBxWsVGKvcNjISm1yhPZxZnoUMdlt-O82L9434kfg_ebSFhDuWMBRx58oSw73F7S728wbDeFY1B8I85OJFatdTKq5nQA8NuT2myR0ocpOfFeBWYXNFoCg86wljET9XWt_8QUa8f0TaYaYw0MULvlXYJDNe09oHGbTxsb7x6Z1TksF9pzMc7F8EofpQbo7WGI',
    badge: 'Creator',
  },
  {
    title: 'Titan Series DDR5',
    subtitle: '5600MHz • 48GB (2x24) • CL36',
    price: '$175.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmk3eBverNk1fO2KXqFBcmSJfSlCnY_LIF5mtxoFUAb4lggqxYdIOOz-opPSpo5Q1f7hF5vGPgx8ru-cLlqu9chIZYbF9o0HrlPGc5Pe8O2sL6L89TrFJ7KZwObyKfmrn8s9TPXON8K0sCrPDshQrFVag4_36si7PdzHpeDmPds9Y4G0TNDwgugG-IPxuA0-kpqlNfpWK0KSq3wOUkc55tQ9CWJPwetj8_uz4-KEnIgwaNHt7F2fMecYwnPp1Q5klj0EnjzYJ-J9Fr',
    badge: 'High Capacity',
  },
  {
    title: 'Neon Prism Special',
    subtitle: '7600MHz • 32GB (2x16) • CL36',
    price: '$299.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDv9DuH1RRz2_00dLE6T3MXKsUO6C99UrDzl8en70m-_JAb4MzEjpdFGsFI1Dp8SF02qndFSbVJsrV4KDvvVgQ3ZGhtEmePdK45k-wDhK7argAuHgfeAertbPk6yjEdZkznmzQXfLswX0KsX1PZd4UOD5bSx5vNxvcgB9ocitH8L-5RpkON3tNpH92CniZGbGFoqS9r0-IPD0ViqwmP0m7KZ9rN9ar6E18HDMwKkClyru2NANaVtycRh1jRv1Zk3e2EDWsm75GSZaUc',
    badge: 'Limited Edition',
  },
];

export default function Ram() {
  return (
    <ItemPageTemplate
      headerBadge="DDR5 Performance"
      headerTitle="Memory Re-Engineered"
      headerSubtitle="Push the boundaries of data processing with next-generation DDR5 memory kits engineered for gamers, creators, and enthusiasts."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuD3btYXrAG48gL05ys6H7Gu_QHM1C_CeihFWSYDDF1Tp-0_eCOaUvApWKzTBAsywUYdmFlJHup5HJwPgaFTxWS50-vv9Pnjb4xmxrqmZBky7e2GgBdJsN94K3d7S77jz3mdI7UMOepV_WppHRnL3_CVJVZ-C-_3w6VW_bUUxiYsM8ymA9lVvMn9lBJiCkzGqBbxgX5qBsfowFCBrXBZFsYLu6sSSrz9zRFQzr19Uv3dSLZn66iTMOiqQ9qHpEpFxonpQghuzFVNb7nv"
      products={sampleProducts}
      promo={{
        title: 'Apex Series 96GB Kit',
        description:
          'DDR5 6800MHz CL34 memory designed for professionals who demand extreme multitasking, stability, and unmatched throughput.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBq0UYeWGQ20WGuM2jY_NhPBbRQySOJ-iEodH-GD6luesDxdOjn46_opBz9htDkE07Y5qXlEKb-_-X-jDm6Hw5lrt9SfoqaCXCSFY7M2T3fGMkqPBgjntiywG73eKlSebC5b1DPauJZl5PPZkCee0LOrfbnCVt5ozVP277f66SP1cvxKRak79u-szsiIT8AVEPEk103N46zjPFGd06FdcKmQY9OhzpiWm8tc5y02XvGWgtYQQK63wMbA-2u2gpBTuK7PkRZT5VMDS2K',
        cta: 'Explore DDR5 Kits',
      }}
    />
  );
}