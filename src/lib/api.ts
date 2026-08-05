// Shared API configuration.
// VITE_API_URL should point at the backend's /api root, e.g. http://localhost:5005/api
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Backend origin without the /api suffix — used to resolve uploaded image paths
// like "/uploads/images/photo.jpg" into a full URL the browser can load.
export const ASSET_BASE_URL = API_URL.replace(/\/api\/?$/, '');

/**
 * Resolves an image path coming from the backend (e.g. "/uploads/images/x.jpg")
 * into a full URL. Paths that are already absolute (http/https) or point at the
 * frontend's own static assets ("/images/...") are returned unchanged.
 */
export function resolveImage(path?: string | null): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/uploads')) return `${ASSET_BASE_URL}${path}`;
  return path;
}
