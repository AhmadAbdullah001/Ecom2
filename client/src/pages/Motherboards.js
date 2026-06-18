import React, { useState } from 'react';

const motherboards = [
  {
    id: 1,
    title: 'Apex Dominator Z790',
    subtitle: 'Standard ATX | DDR5-8000+ Support',
    price: '$499.00',
    badge: 'Z790',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYW1SpiEDPiYrr9OaWO19zZn8UqPtEbby6CtBqnG4txKZiuSPmmENQbPNnCafZhqixtqWBpzakKHeEqZUCjW6SojU14jcoKWjz81io2_Cr6RD_sM7K0bkpHG5MNZ88L2X0EQz8E29rYOVomXXD2mUfqNNVBXPnoPmYYAwRXAjQpcP_jSj1ktrHJzNN8xK9d7V6Z_mvdW10pic-2QO8Ue1za-drzdrvcPEOpJkTu_n33hWVxwHY07F9lqF8oG1qlsydD_rGPNrOLm1I',
  },
  {
    id: 2,
    title: 'Quantum X670E Silver',
    subtitle: 'Extended ATX | PCIe 5.0 Ready',
    price: '$549.00',
    badge: 'X670E',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjlakn2zkGqzOWetwdeXfgxxdu11hFJzxA0ko6MxsMR3wOVZhaoKkgbc9TvFzNqtwfPvgEoeU1_OtSYSwnyVv6z-dbO5CUaW1mnHjfXuBq1VWNzm-QgFo0NINp2n4ArNpimL9ndDOcVueDyarZSaS01lmpvSMWjfiihVgo0edjkUVvcuhMIw9R3byRjR1SULRWWbaDszazfV2zmb3fYAVoljEVaVSdInHsBL1TggNC5Vg8tu06mNUs_pqQmq6RFYZ9N0LCfT212He',
  },
  {
    id: 3,
    title: 'Core B650 Mini-I',
    subtitle: 'Mini-ITX | Wi-Fi 6E Integrated',
    price: '$229.00',
    badge: 'B650',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt30vHDd0GlRHvZzD1d-m7KIo4-UuD9KWeKN9wD1q67-bZqgR3RHtng1Cy3BXAjYNQNVevCQf47966a_S0-SJ4_aV_g7l6C7uBDWRhryNBhFUOq2WzsL-LOvkJpZkRPT9kniGqrsWkf0rIoB4co8JX1WAhFi3ft_x73UZE9QKKHzZcGStsdFHfUIQUc1So5izqhMBVD836TyJIeO-4lUkr7Q0r-pf3epg6gS2Cl-cmTMpDELQIF79TnRGdt_wc9vgw9tEfCv-1Hztz',
  },
  {
    id: 4,
    title: 'Stealth Z790 Carbon',
    subtitle: 'Standard ATX | Thermal-Optimized',
    price: '$389.00',
    badge: 'Z790',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCee1QmT7DPFRYbEMh5FnYl-HBfKHcRiQojU3coXPnrwiNkrNYgNrJXqkKZiaVWob96qrJn1rFM8hLjiJKCzFSAHvw-aKYfnY3eArZj1NonjjGP2Id-PKyWhcXXNaMMsDWq-eBkqnU6pt6hR8eaTktV8yt22_uOs-s6P1KhUWQGWsbw1-zymFR1zQqAG3zTXS-zsd4Ys_dpyoJKNjSE1PTHM15y72RNLlFI5mdhj3AGJD2xXkEKHsZtZsgtCGUgVjk9ACvmNFt95Uo5',
  },
];

export default function Motherboards() {
  const [filters, setFilters] = useState({
    chipset: [],
    formFactor: [],
  });

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[353px] md:h-[442px] flex items-center overflow-hidden bg-surface-container-low pt-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-40" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgg50rrM4JafydLvNFw5xfyGaAfEVAKh2000VedEkPLDdkUqO_CF5N5Zy3j0-DTsSoYGOliQge31vHxxAvnB34iO_efkFKhyQRWQg8yEdZCuHHyfmg7GlFeQb1PuXAhzj6Yk2u5rsuVMrfg0DKDI-BAUC")'}}
          />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">Engineered for Performance</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary max-w-2xl">
            Motherboards
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-xl">
            Experience the pinnacle of stability and speed with our precision-engineered core components. Optimized for next-gen silicon.
          </p>
        </div>
      </section>

      {/* Product Interface */}
      <section className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto mt-12 md:mt-24 pb-32">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              {/* Chipset Filter */}
              <div>
                <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-6">Chipset</h3>
                <div className="space-y-3">
                  {['Intel Z790', 'AMD X670E', 'AMD B650'].map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={filters.chipset.includes(option)}
                        onChange={() => handleFilterChange('chipset', option)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="h-px bg-outline-variant w-full"></div>

              {/* Form Factor Filter */}
              <div>
                <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-6">Form Factor</h3>
                <div className="space-y-3">
                  {['Extended ATX', 'Standard ATX', 'Mini-ITX'].map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={filters.formFactor.includes(option)}
                        onChange={() => handleFilterChange('formFactor', option)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset CTA */}
              <button 
                onClick={() => setFilters({ chipset: [], formFactor: [] })}
                className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-10 border-b border-outline-variant pb-6">
              <span className="font-body-md text-body-md text-secondary">Showing {motherboards.length} results</span>
              <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md text-secondary">Sort by:</span>
                <select className="bg-transparent border-none font-label-md text-label-md text-primary focus:ring-0 cursor-pointer">
                  <option>Newest Arrivals</option>
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-16">
              {motherboards.map(product => (
                <div key={product.id} className="studio-card-hover group cursor-pointer">
                  <div className="aspect-square bg-surface-container-low rounded overflow-hidden relative mb-6">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="product-image w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-sm">
                        {product.badge}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-headline-md text-primary group-hover:text-surface-tint transition-colors">
                      {product.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-headline-md text-headline-md text-primary">
                        {product.price}
                      </span>
                      <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto mb-12">
        <div className="bg-primary p-12 md:p-24 rounded-xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="max-w-xl relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6">Join the Gear Syndicate</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container">
              Get early access to flagship launches, technical deep dives, and exclusive hardware configurations.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 relative z-10">
            <input 
              type="email"
              placeholder="Your corporate email"
              className="bg-transparent border-b border-on-primary-container text-on-primary placeholder:text-on-primary-container/50 px-0 py-4 focus:ring-0 focus:border-on-primary w-full md:w-80 transition-colors"
            />
            <button className="bg-on-primary text-primary px-8 py-4 font-label-md text-label-md rounded hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
