/**
 * Compose a new function from the given functions.
 */
const compose =
  (...functions: Function[]) =>
  (args: unknown[]) =>
    functions.reduceRight((arg, fn) => fn(arg), args)

export default compose
