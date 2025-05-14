/**
 * Utility functions to handle ID inconsistencies in our API responses
 * Some API endpoints return 'id' while others return '_id'
 */

/**
 * Safely checks if an item has a valid id property (either 'id' or '_id')
 */
export const hasValidId = (item: any): boolean => {
  return item && typeof item === 'object' && 
    (('id' in item && typeof item.id === 'string') || 
     ('_id' in item && typeof item._id === 'string'));
};

/**
 * Gets the ID from an item, handling both 'id' and '_id' cases
 */
export const getItemId = (item: any): string => {
  if ('id' in item && item.id) return item.id;
  if ('_id' in item && item._id) return item._id;
  return '';
};

/**
 * Normalizes an item by ensuring it has a standard 'id' property
 * This helps with TypeScript compatibility
 */
export const normalizeItem = <T extends object>(item: any): T => {
  if (!item) return {} as T;
  
  const normalized = { ...item };
  
  // If the item has _id but no id, add id property
  if ('_id' in item && !('id' in item)) {
    normalized.id = item._id;
  }
  
  return normalized as T;
};
