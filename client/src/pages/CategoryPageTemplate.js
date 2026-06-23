import React, { useState, useEffect, useContext } from 'react';
import itemContext from "../context/Context";
import ItemPageTemplate from './ItemPageTemplate';
import { normalizeCategoryName, productMatchesCategory } from '../utils/categories';

export default function CategoryPageTemplate({
  categoryName,
  headerBadge = '',
  headerTitle = '',
  headerSubtitle = '',
  heroImg = '',
  promo = null,
}) {
  const { getCategories, fetchproducts } = useContext(itemContext);
  const [products, setProducts] = useState([]);
  const [categoryImage, setCategoryImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all categories to find the one matching categoryName
        const categories = await getCategories();
        const normalizedTarget = normalizeCategoryName(categoryName);
        const matchedCategory = categories.find(
          (cat) => normalizeCategoryName(cat.name) === normalizedTarget
        );

        if (matchedCategory && matchedCategory.image) {
          setCategoryImage(matchedCategory.image);
        }

        // Fetch all products
        const allProducts = await fetchproducts();

        const categoryProducts = allProducts.filter((product) =>
          productMatchesCategory(product, categoryName, matchedCategory)
        );

        // Transform products for display
        const transformedProducts = categoryProducts.map((product) => ({
          id: product._id,
          title: product.head,
          subtitle: product.title,
          price: product.price,
          image: product.imgurl && product.imgurl.length > 0 ? product.imgurl[0] : '',
          badge: '',
          rawProduct: product,
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, getCategories, fetchproducts]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading products...</p>
      </div>
    );
  }

  return (
    <ItemPageTemplate
      headerBadge={headerBadge}
      headerTitle={headerTitle}
      headerSubtitle={headerSubtitle}
      heroImg={heroImg || categoryImage}
      products={products}
      promo={promo}
    />
  );
}
