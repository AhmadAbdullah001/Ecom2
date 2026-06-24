import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItemPageTemplate({
  headerBadge = '',
  headerTitle = '',
  headerSubtitle = '',
  heroImg = '',
  products = [],
  promo = null,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('performance');
  const itemsPerPage = 2;

  const parsePrice = (value) => {
    const priceString = typeof value === 'string' ? value.replace(/[^0-9.]/g, '') : String(value);
    return parseFloat(priceString) || 0;
  };

  const sortedProducts = useMemo(() => {
    const list = Array.isArray(products) ? [...products] : [];

    if (sortBy === 'price-asc') {
      return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }

    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [products, sortBy]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [page, sortedProducts]);

  const handlePageChange = (newPage) => {
    const normalizedPage = Math.min(Math.max(1, newPage), pageCount);
    setPage(normalizedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDetails = (product) => {
    if (product?.rawProduct) {
      navigate('/itemdetails', { state: product.rawProduct });
    }
  };

  const scrollToProducts = () => {
    const section = document.getElementById('category-products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="pt-24 pb-32">
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="relative z-10 flex-1">
            {headerBadge && (
              <span className="inline-block px-3 py-1 bg-dark text-on-primary rounded text-label-sm font-label-sm mb-6 uppercase tracking-widest">
                {headerBadge}
              </span>
            )}
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-dark mb-6">{headerTitle}</h1>
            {headerSubtitle && <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{headerSubtitle}</p>}
          </div>
          {heroImg && (
            <div className="flex-1 w-full max-w-md perspective-1000">
              <div className="w-full h-80 rounded-lg bg-surface-container-highest shadow-2xl rotate-y-12 transition-transform duration-700 hover:rotate-y-0 relative group">
                <img className="w-full h-full object-cover rounded-lg" src={heroImg} alt={headerTitle} />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-4 gap-gutter">
        <aside className="lg:col-span-1 space-y-10">
          <div>
            <h3 className="font-label-md text-label-md text-dark uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">Filter By Brand</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group"><input className="w-5 h-5 rounded border-outline-variant text-dark focus:ring-primary" type="checkbox" /> <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-dark transition-colors">NVIDIA GeForce</span></label>
              <label className="flex items-center gap-3 cursor-pointer group"><input className="w-5 h-5 rounded border-outline-variant text-dark focus:ring-primary" type="checkbox" /> <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-dark transition-colors">AMD Radeon</span></label>
              <label className="flex items-center gap-3 cursor-pointer group"><input className="w-5 h-5 rounded border-outline-variant text-dark focus:ring-primary" type="checkbox" /> <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-dark transition-colors">ASUS ROG</span></label>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-8">
            <span className="text-label-sm font-label-sm text-secondary">Showing {products.length} items</span>
            <div className="flex items-center gap-2">
              <span className="text-label-sm font-label-sm text-secondary">Sort by:</span>
              <select
                className="bg-transparent border-none font-label-sm text-label-sm text-dark focus:ring-0 cursor-pointer"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
              >
                <option value="performance">Performance (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div id="category-products" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {paginatedProducts.map((p, idx) => (
              <div className="group" key={idx}>
                <button
                  className="relative aspect-square bg-surface-container-low rounded-xl overflow-hidden mb-4 border border-outline-variant transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg w-full cursor-pointer"
                  type="button"
                  onClick={() => goToDetails(p)}
                  aria-label={`View ${p.title || 'product'} details`}
                >
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.image} alt={p.title} />
                  {p.badge && <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-on-primary text-[10px] font-bold tracking-widest uppercase rounded">{p.badge}</div>}
                </button>
                <div className="flex justify-between items-start">
                  <button
                    className="text-left"
                    type="button"
                    onClick={() => goToDetails(p)}
                    aria-label={`View ${p.title || 'product'} details`}
                  >
                    <h3 className="font-headline-md text-headline-md text-dark mb-1">{p.title}</h3>
                    {p.subtitle && <p className="text-label-sm font-label-sm text-secondary uppercase tracking-wider mb-2">{p.subtitle}</p>}
                    <span className="text-body-lg font-body-lg text-dark font-semibold">{p.price}</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-primary hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}

            {promo && (
              <div className="md:col-span-2 relative rounded-xl overflow-hidden text-on-primary p-10 flex flex-col justify-end min-h-[350px] group">
                <div className="absolute inset-0 z-0">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={promo.image} alt={promo.title} />
                </div>
                <div className="relative z-10">
                  <h3 className="font-headline-lg text-headline-lg mb-4">{promo.title}</h3>
                  <p className="font-body-md text-body-md text-on-primary-container max-w-md mb-6">{promo.description}</p>
                  <button
                    className="px-8 py-3 bg-on-primary text-dark font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity"
                    type="button"
                    onClick={scrollToProducts}
                  >
                    {promo.cta || 'Explore'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-secondary hover:text-dark transition-colors"
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }, (_, index) => {
                const pageIndex = index + 1;
                return (
                  <button
                    key={pageIndex}
                    type="button"
                    onClick={() => handlePageChange(pageIndex)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-label-md transition-colors ${
                      pageIndex === page ? 'bg-dark text-on-primary' : 'hover:bg-surface-container-high text-secondary'
                    }`}
                  >
                    {pageIndex}
                  </button>
                );
              })}
            </div>

            <button
              className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-secondary hover:text-dark transition-colors"
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pageCount}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
