import React from 'react';
import CategoryPageTemplate from './CategoryPageTemplate';

export default function Processors() {
  return (
    <CategoryPageTemplate
      categoryName="Processors"
      headerBadge="High-Performance Computing"
      headerTitle="High-Performance Computing"
      headerSubtitle="Precision-engineered silicon designed for peak productivity, creative workflows, and elite-level gaming dominance."
      heroImg="https://lh3.googleusercontent.com/aida-public/AB6AXuDJYXDMHBs8BNLVh1grflPrXbzd3UBD3K0FzclpqjYdoI0uT51ytqKl_zkmuUbeEmSTVM9d8J3neZofCj5xMEqcG9k-3vAYH5sUF4dRTc4BNr_vOT0frsvKkVzo0SfO0gtDAumq6PT_Vn_uAhKb7UHaxr_c2db4r85E_CD_nxrK8d7V9hM6Hsdg5NmOn_uHCfS0f2bz_rUKqOUQvjO5rjt7Y-u6ztue6uXe-QT7Q0eh2sDMS0eRGgmdKaO4V4feXBM4xXlYUQMUrxTr"
      promo={{
        title: 'Peak Productivity',
        description: 'Experience unmatched computing performance with precision-engineered processors designed for peak productivity.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJYXDMHBs8BNLVh1grflPrXbzd3UBD3K0FzclpqjYdoI0uT51ytqKl_zkmuUbeEmSTVM9d8J3neZofCj5xMEqcG9k-3vAYH5sUF4dRTc4BNr_vOT0frsvKkVzo0SfO0gtDAumq6PT_Vn_uAhKb7UHaxr_c2db4r85E_CD_nxrK8d7V9hM6Hsdg5NmOn_uHCfS0f2bz_rUKqOUQvjO5rjt7Y-u6ztue6uXe-QT7Q0eh2sDMS0eRGgmdKaO4V4feXBM4xXlYUQMUrxTr',
        cta: 'View Specifications',
      }}
    />
  );
}
