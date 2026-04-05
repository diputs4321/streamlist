/**
 * Formats a number as a price with 2 decimal places
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string
 */
export function formatPrice(price) {
  return price.toFixed(2);
}
