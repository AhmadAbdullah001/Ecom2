import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Mice() {
  return (
    <CategoryPageTemplate
      categoryName="Mice"
      headerBadge="Collection 04"
      headerTitle="Precision Engineering. Tactile Fluidity."
      headerSubtitle="Discover our curated selection of high-performance peripherals, from ultra-lightweight esports tools to ergonomic productivity masters."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDezG4cgpMjXhklc1SNGuvfD5XAgqZbwPunzotzEIBra-NgdO5sydWiXW6dO_G-tPYjmp3IoB14lT86TxiriY6PMh-Qn_VlplOEHv6rK7G-eQcGrbPvpY0nyFqGWDX3lCAxwm4nRx7JP7xI3h_zXCPRbNO46CvcszCGbfAPGJ5cxJTwedHPVtxWsgqCFENYlmxa2bQx21YusSXULp95dGSIn5seZVeWpSbQxX8EA_Vi6d_wuSz908D5VoSp9F3BEyj5uJyxpMe1Y9k9"
      promo={{
        title: 'Aura X1 Air',
        description:
          'Engineered for competitive play with an ultra-light 52g chassis, flagship sensor technology, and uncompromising wireless performance.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXFKr5q0_sQvZZWO4mLLEW1PvSn-WJUMpA5GXfRSHWf38c8xWDkLI_ygCK6M7f3S_-LqT-bQMVMlkr8zXs3WBtUq9qXdIJHNL8oLWZEw8T_-79xmvZnEjRx1V-76aEuIa4dWqFvL7uEKLh5h6EJtlMM0qZBVX3PVNRbLWUTJyy0vXQcYqDdZdIzX3hVEwEQVLcsEqc6Qy9L0oGfV0WDOBrHkWJLsKRdBvBGR6rVBhqMRAJfDtjZ5uIrH7Rw_gYs0n5m9xc5K',
        cta: 'Explore Mice',
      }}
    />
  );
}