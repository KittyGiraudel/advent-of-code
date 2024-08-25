/**
 * Find the unique values from the given array.
 * @param array - Array of values to get the unique entries from
 */
const unique = <T>(array: T[]) => Array.from(new Set<T>(array))

export default unique
