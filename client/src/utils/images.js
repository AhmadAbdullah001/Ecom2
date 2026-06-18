export const FALLBACK_IMAGE = "/images/img1.jpg";

export function normalizeImageSrc(src) {
  if (!src || typeof src !== "string") {
    return FALLBACK_IMAGE;
  }

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("/")
  ) {
    return src;
  }

  return `/${src.replace(/^\.?\//, "")}`;
}

export function imageFallback(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = FALLBACK_IMAGE;
}
