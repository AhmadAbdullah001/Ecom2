import React from 'react';
import ItemPageTemplate from './ItemPageTemplate';

const sampleProducts = [
  {
    title: 'Intel Core i9-14900K',
    subtitle: '24 Cores (8P+16E) | Up to 6.0 GHz | LGA 1700 Socket',
    price: '$589.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJYXDMHBs8BNLVh1grflPrXbzd3UBD3K0FzclpqjYdoI0uT51ytqKl_zkmuUbeEmSTVM9d8J3neZofCj5xMEqcG9k-3vAYH5sUF4dRTc4BNr_vOT0frsvKkVzo0SfO0gtDAumq6PT_Vn_uAhKb7UHaxr_c2db4r85E_CD_nxrK8d7V9hM6Hsdg5NmOn_uHCfS0f2bz_rUKqOUQvjO5rjt7Y-u6ztue6uXe-QT7Q0eh2sDMS0eRGgmdKaO4V4feXBM4xXlYUQMUrxTr',
    badge: 'Elite Performance',
  },
  {
    title: 'AMD Ryzen 9 7950X3D',
    subtitle: '16 Cores | 32 Threads | 144MB Total Cache | AM5 Socket',
    price: '$699.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0OcqGPo5N8RbuXtdjkk28wMlNDpeRhG7r2431O5d0YgijccGHo4ZpiAn8Ke7vZkKqzZKLlv2ONANoO8sLwl6HehQ5xAy5508BTp_MyjPMj3-unev32TQP7MQkfLAzq0E_-_U0eq11DMzXihAZH1NzGwJTKT62uxpjbfxtBpxxN6iUXZAwchWk4SvT1ALEsl2joRsv6eC9ncIR6DFIx9OEN4WsNmY082Tm6hxW-MWiSKXBW6FV380S2f9sJQ_fXtJ22E0cCQkzcQP3',
    badge: '3D V-Cache',
  },
  {
    title: 'Intel Core i7-14700K',
    subtitle: '20 Cores (8P+12E) | Up to 5.6 GHz | LGA 1700 Socket',
    price: '$409.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuwkarHv0hPKin0Om5CYfebSJB28LTTTfeue-NlL2vYzJUCd47IxwEbJSPnyYuz_ui9HhVABFQxllqU4cXBd32nAG840B4zhqCeC31LUsxCrazi7Py7UEHNgA1DBcF0y6hgqhPWo6xR4-nRVzbNNNHidLtbdarN5F812xS6zVOZd1wSUJ3bkzymNQ1MSn6gQ1h8o3m4Fv6L9VkoAI9-LSZOn6Q0gR4VmXcjOB1At1vrj3I1baO2_a6f-craf0au-IPLwY_l4lxA-kx',
  },
];

export default function Processors() {
  return (
    <ItemPageTemplate
      headerBadge="High-Performance Computing"
      headerTitle="High-Performance Computing"
      headerSubtitle="Precision-engineered silicon designed for peak productivity, creative workflows, and elite-level gaming dominance."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDJYXDMHBs8BNLVh1grflPrXbzd3UBD3K0FzclpqjYdoI0uT51ytqKl_zkmuUbeEmSTVM9d8J3neZofCj5xMEqcG9k-3vAYH5sUF4dRTc4BNr_vOT0frsvKkVzo0SfO0gtDAumq6PT_Vn_uAhKb7UHaxr_c2db4r85E_CD_nxrK8d7V9hM6Hsdg5NmOn_uHCfS0f2bz_rUKqOUQvjO5rjt7Y-u6ztue6uXe-QT7Q0eh2sDMS0eRGgmdKaO4V4feXBM4xXlYUQMUrxTr"
      products={sampleProducts}
      promo={{
        title: 'Peak Productivity',
        description: 'Experience unmatched computing performance with precision-engineered processors designed for peak productivity.',
        image: sampleProducts[0].image,
        cta: 'View Specifications',
      }}
    />
  );
}
