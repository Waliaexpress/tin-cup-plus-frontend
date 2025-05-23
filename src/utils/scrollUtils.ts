/**
 * Utility functions for smooth scrolling
 */

/**
 * Smoothly scrolls to the specified element
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional vertical offset (useful for accounting for fixed headers)
 */
export const smoothScrollTo = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
