export function normalizeImageSrc(src) {
  // Handle missing or invalid URLs
  if (!src) {
    return null;
  }

  // If it's a valid Cloudinary or external URL, return as is
  if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('data:'))) {
    return src;
  }

  // Return as is for other cases
  return src;
}
