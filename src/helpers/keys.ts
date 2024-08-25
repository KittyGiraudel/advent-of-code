/**
 * Return the keys of the given object in a type-safe way.
 * @param obj - Object to get the keys of
 */
const keys = <T extends string>(obj: Record<string, unknown>) =>
  Object.keys(obj) as T[]

export default keys
