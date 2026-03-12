const IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Build a full TMDB image URL.
 * @param {string} path - Image path from TMDB (e.g. "/abc123.jpg")
 * @param {string} size - Image size (w200, w300, w500, w780, original)
 */
export const imageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

export const backdropUrl = (path) => imageUrl(path, "original");
export const posterUrl = (path, size = "w500") => imageUrl(path, size);
