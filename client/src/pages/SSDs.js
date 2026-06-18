import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'V-X Alpha Gen5 NVMe',
    subtitle: '14,500 MB/s • 2TB • PCIe Gen5',
    price: '$349.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADqHnzhX8GLRL7tmok054ueFm_ml274Rn6B88ZD7Ng4KGVr10qgu6eHTqKqXjiZtFI-x7uA88Vd82H8A6xGjjU3jY4jP4Q8fObB8mRF8u1DOJxQcge8H9zoozF63V_W5BoKOGVh6U0DllZfziiC4t6_0Awn84pdkF37stG8B7lX10rSP4b4pQsaRjFr-q9xSkkiW6L_VeGqDaBlG4SvOYrrO2BtfHtx_8gu2x2jW6jGCDvqCaPDcZHYpr8Aj6lWsEccrVFou7yjOpk',
    badge: 'Gen 5',
  },
  {
    title: 'Streamline G4 Elite',
    subtitle: '7,400 MB/s • 1TB • PCIe Gen4',
    price: '$129.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCapIOfUvl2YI4NoRc9ISyIJxrfizZyCYqbTfrI6pBWpKZVjbrWtrkMpkvDPLPzRMLiAcqdL0Lwm8yZyh6pkzD92yR-I-D1Qudy68ht7-yMZxKfDnwDNXa9hUyhSv-kq0WuHLC1UxFbThwhi-gtJY-NC_0RWOJgWSdRwxQWCSQD454SJOSBjLfCnEXqrlEpUfOcuMn_PkSMzoH-uYGN05LYFXeWQJD0YLugzpx-mQ8uvdkUCp18EoijT6PP61Q0ODQa7zg1lSOFg6Fn',
    badge: 'Gen 4',
  },
  {
    title: 'Vault SATA 8TB',
    subtitle: '560 MB/s • 8TB • SATA III',
    price: '$599.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDr2wskMdOFWpMlC3dobbmUWXCzFpyzEq00EeFfTwAaJ3TMSacvfy01hQd_TY0f4xWv7nJa7kmPU55LpfkCEmj98QPFbi7p7NJvUaaiWcaC_NlNgAN9ZedfmzqJVooqZvPVTcINcYZfWWQocHM5jyXBhOHLeCur9EG8-jKUNUV7M0xyiXP3oy-Dy5YV3SfFLE4jZGs4AyAC2SpTDYzGIEp4fPGaUq3yXNPOqGevG6hvphR7ksNlgPK3YXHMqfh4pOUZZCnF0ONVIWpY',
    badge: '8TB',
  },
  {
    title: 'OmniDrive Gen4 Pro',
    subtitle: '7,000 MB/s • 4TB • PCIe Gen4',
    price: '$419.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6xk4cppESFpRgwpcNTe8DZNA0PZ8y2Cj9NdizkUNUm115eYmAtScL7cwPwPL_xnGn08U7U8uqE7AoZY6zwece6nBroe3eDheF0OJl5-Fo-NENcjOQ7rWj4zz30ncLz562DG06aIEmp4RLexfANZ9_S_BA98GaHyTcTRBdfAhWJtDnHXvqPxyHng2Yd8t1KjmvI3MNEF-zUNNT3cl18p7Mkyh6eojoHEgKi2C3gAzddwJ-X4jsc9R-JEqPqmVfbHXAprc8N3vx_3ni',
    badge: 'Workstation',
  },
  {
    title: 'V-X Lite Gen5 NVMe',
    subtitle: '10,000 MB/s • 1TB • PCIe Gen5',
    price: '$219.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNYzgHorbJrScaYojgHG9vNiIkBeLLgbRTc2iQqx692nqfDbLbrb00EJemHqCex3wxTwMtb1LpbQLsQPYklSFe2DsNMLUMwzkg5rTE8TBnmjWOsRLXBI0_qSHrrQZeNhfubVm-ZNYOClgK0bMl5NNGUBRu-4sK98Xrwcg6xQ-nkqEgym_wS6qJ_XOTYD_qEf9z5Yvd6PIFL1Ee1DuPsy10KvpsQ6ZemUbWFV01ijCQ77AIOE8ybkmpCyZ6CdePHcwIAHVSu55LfRb0',
    badge: 'Gen 5',
  },
  {
    title: 'Titan SATA SSD',
    subtitle: '560 MB/s • 4TB • SATA III',
    price: '$289.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkhDbBvX8ymSV_K3dNvRXwpeJvnpkrkIIL16syTZm-zAPAJWAkvmg8_EQCkmoGbARSZrLKuH98vEbGTfVJjAdGz1wqXWA7VPGIisf_Bc0HxCgajLMZ01D39fXYuryR3JPH97dqMFTExhC3NsBNvU4z5ZL4x_IC6RIfzQ-ZIJng8LfyXVFyKUv-ZFU_Gl9e1OFcF-eyjeKvN4SPBhzlvdZSD7Sc3NoIhPyzMDUEv6gLYdhoJn8pAlbTvAuoes4ytXSgyANs1Lk800O2',
    badge: '4TB',
  },
];

export default function SSDs() {
  return (
    <ItemPageTemplate
      headerBadge="High-Speed Storage"
      headerTitle="High-Performance Storage"
      headerSubtitle="Precision-engineered solid state drives designed for relentless speed and absolute data integrity. From NVMe Gen5 breakthroughs to high-capacity enterprise SATA solutions."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuADqHnzhX8GLRL7tmok054ueFm_ml274Rn6B88ZD7Ng4KGVr10qgu6eHTqKqXjiZtFI-x7uA88Vd82H8A6xGjjU3jY4jP4Q8fObB8mRF8u1DOJxQcge8H9zoozF63V_W5BoKOGVh6U0DllZfziiC4t6_0Awn84pdkF37stG8B7lX10rSP4b4pQsaRjFr-q9xSkkiW6L_VeGqDaBlG4SvOYrrO2BtfHtx_8gu2x2jW6jGCDvqCaPDcZHYpr8Aj6lWsEccrVFou7yjOpk"
      products={sampleProducts}
      promo={{
        title: 'V-X Alpha Gen5 NVMe',
        description:
          'Experience next-generation performance with blazing-fast 14,500 MB/s speeds powered by PCIe Gen5 technology.',
        image: sampleProducts[0].image,
        cta: 'Explore SSDs',
      }}
    />
  );
}