import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'Aura X1 Air',
    subtitle: 'Esports Pro • 52g • Ultra-Lightweight',
    price: '$149.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDezG4cgpMjXhklc1SNGuvfD5XAgqZbwPunzotzEIBra-NgdO5sydWiXW6dO_G-tPYjmp3IoB14lT86TxiriY6PMh-Qn_VlplOEHv6rK7G-eQcGrbPvpY0nyFqGWDX3lCAxwm4nRx7JP7xI3h_zXCPRbNO46CvcszCGbfAPGJ5cxJTwedHPVtxWsgqCFENYlmxa2bQx21YusSXULp95dGSIn5seZVeWpSbQxX8EA_Vi6d_wuSz908D5VoSp9F3BEyj5uJyxpMe1Y9k9',
    badge: 'New Release',
  },
  {
    title: 'Cortex Pro',
    subtitle: 'Ergonomic • Mag-Wheel • Productivity',
    price: '$129.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACB1BAxeoSRc_oEsXtPEOglKmvZzHJCj3zD2l0UVBwj_C18sYe-Ci4w6c4MV5bVpIQb84Ai-s_63Cf1nn5V8Cj_dEib6YguSMnB8fKgfAFvrq9P-lUCgtRqhL5_miJlM34eAJ0XzUZfsSiGx6o0UiiY9AbdUuu0oSIWeyfoL7vSfqVUVuykLRmjysJN2WUOzbKjaRxAH5UnYhjAeEkij6D3yKPCNbe_BrdWtIn3Ina3-qaOCtMwVccgAUbFadfa37qLaQ6ELe8d6Gd',
    badge: 'Ergonomic',
  },
  {
    title: 'Vortex G-Core',
    subtitle: 'Wireless Hybrid • 24K DPI',
    price: '$179.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6ex_BE8g48Pmipl-yVPpiL10EY3bZ3rVu6Dd32tGUMoLIA4jMIUe3wQsEMYawEfQAZHXeLpNO4HRAATVz1b_yWLmETYTZ7N-fiNSBLXVlA94aBdu0o2TC8C5ypRQ5KVeyWl1KAAdTpNytJCa89oWCAbcdycYk3gPSyDeqqh1_p6RLNnhkMAhKsHt34JAeNgXneyODEYpCCBnhFGy4lAzTaqCPUaxUlGXp_3PxSi042PCwaSP2GmOa7I4UAKiU3rBe_8b2H7T-NTuL',
    badge: 'Wireless',
  },
  {
    title: 'Apex Zero',
    subtitle: 'Pure Performance • 48g',
    price: '$199.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmTM1wlSUmCsZQeBh5MLva4_Wncd4FEIE9U50CDCnYbMUfR9ihGYjcjhzovWGsSAiIalopMYaLcuoZhsZGHSYW_TMmYn4WuifsykBKscSPWYzg1PCtGNpxeRXe8_C2nD-PnJ0A_vRs_TrsIGwJifjbeo4W8JOEcRgbIWIDPwTdcLJCM-TIZUtYqvMl4cv97WFp-vz-I3vLG2wf1PrzpHhO6Fv7mDIZ76Ao2H9GNHaxtV3GKafuKdjhq5eHO3LKA_ubOLW9U-AAjFg7',
    badge: 'Ultra-Light',
  },
  {
    title: 'Nomad Mini',
    subtitle: 'Travel Essential • Bluetooth',
    price: '$89.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDedd07jpynMvAW71gi4yMcDyJEL7DvzdZbDhkki9l32dIoWPZhvMyZnk4PBnhPFb9qSAB26hMrFtOb554FAgk9NJfTyGhMc_enfZDhohjuRFmOy8VBejM6fyND5U2dYyBbHfYyGqu4TdTSU3U0-KNHmQoj3E5CoN7xawjaJZzCasSlhe_RWSlVDcdCqtHAsK5kLUW_fwZqTFrzfe2ai6c8ZxDkiBMxk4R9DGb7usHyXGx3Cab5mZGGmuNi3EL0uDoULOvfBzhQy9R_',
    badge: 'Portable',
  },
  {
    title: 'Ignis Limited',
    subtitle: 'Transparent Tech • Custom Switches',
    price: '$219.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZRuiBcewsSiRg9p9mthyFj145gAhbIy2amzj9VDpTsU8WqDJCTOSMTG7cjYgNtRRO_aJXtOmEf9uGJZJYaqFmkTrfmSH7PNcJ5EpzHmLP0kXMlUjOZwxRYfQrw7MBlDGxnPuqw5lqqlpCz2wrBYsQwfXeAvRet4iszRiiqecPyJ1R3JV-DwuG6hmkiWX1I2msN0dN9HQOHmftwEWQsfBhIgBuha--EoiGJ_2wSZxKkbyDLJJQ69sdNruZoJsI9jDK7mVdCn4-JZU',
    badge: 'Limited Edition',
  },
];

export default function Mice() {
  return (
    <ItemPageTemplate
      headerBadge="Collection 04"
      headerTitle="Precision Engineering. Tactile Fluidity."
      headerSubtitle="Discover our curated selection of high-performance peripherals, from ultra-lightweight esports tools to ergonomic productivity masters."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDezG4cgpMjXhklc1SNGuvfD5XAgqZbwPunzotzEIBra-NgdO5sydWiXW6dO_G-tPYjmp3IoB14lT86TxiriY6PMh-Qn_VlplOEHv6rK7G-eQcGrbPvpY0nyFqGWDX3lCAxwm4nRx7JP7xI3h_zXCPRbNO46CvcszCGbfAPGJ5cxJTwedHPVtxWsgqCFENYlmxa2bQx21YusSXULp95dGSIn5seZVeWpSbQxX8EA_Vi6d_wuSz908D5VoSp9F3BEyj5uJyxpMe1Y9k9"
      products={sampleProducts}
      promo={{
        title: 'Aura X1 Air',
        description:
          'Engineered for competitive play with an ultra-light 52g chassis, flagship sensor technology, and uncompromising wireless performance.',
        image: sampleProducts[0].image,
        cta: 'Explore Mice',
      }}
    />
  );
}