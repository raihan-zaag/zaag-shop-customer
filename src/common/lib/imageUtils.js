/**
 * Image utility functions
 */

/**
 * Default fallback placeholder image to use when an image fails to load
 */
export const DEFAULT_PLACEHOLDER_IMAGE = "/images/image_placeholder.png";

/**
 * Handles image loading errors by replacing the src with a placeholder image
 * @param {Event} event - The error event from the image element
 * @param {string} fallbackSrc - Optional custom fallback image URL
 */
export const handleImageError = (event, fallbackSrc = DEFAULT_PLACEHOLDER_IMAGE) => {
  if (event?.target) {
    event.target.onerror = null; // Prevents infinite loop if fallback also fails
    event.target.src = fallbackSrc;
  }
};

/**
 * Returns a valid image URL or a placeholder if URL is invalid
 * @param {string} imageUrl - The original image URL
 * @param {string} fallbackSrc - Optional custom fallback image URL
 * @returns {string} - A valid image URL
 */
export const getValidImageUrl = (imageUrl, fallbackSrc = DEFAULT_PLACEHOLDER_IMAGE) => {
  if (!imageUrl || imageUrl.trim() === '') {
    return fallbackSrc;
  }
  
  return imageUrl;
};

/**
 * A wrapper for Next.js Image component to handle errors
 * Can be used with next/image by passing these props
 */
export const getImageProps = (imageUrl, fallbackSrc = DEFAULT_PLACEHOLDER_IMAGE) => {
  return {
    src: getValidImageUrl(imageUrl, fallbackSrc),
    onError: (e) => handleImageError(e, fallbackSrc),
  };
};
