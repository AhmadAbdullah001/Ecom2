export const normalizeCategoryName = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word))
    .join(" ");

export const getProductCategoryId = (product) => {
  if (!product) return "";
  if (product.category && typeof product.category === "object") return product.category._id || "";
  return product.category || "";
};

export const productMatchesCategory = (product, categoryName, matchedCategory) => {
  const normalizedTarget = normalizeCategoryName(categoryName);
  const productCategoryId = getProductCategoryId(product)?.toString();
  const matchedCategoryId = matchedCategory?._id?.toString();
  const productCategoryName = product?.categoryName?.toString() || "";

  return (
    (matchedCategoryId && productCategoryId === matchedCategoryId) ||
    (matchedCategoryId && productCategoryName === matchedCategoryId) ||
    normalizeCategoryName(productCategoryName) === normalizedTarget
  );
};
