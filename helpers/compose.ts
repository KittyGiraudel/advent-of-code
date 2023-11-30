/**
 * Compose a new function from the given functions.
 */
const compose =
  <T>(...functions: T[]) =>
  (p: any) =>
    functions.reduceRight((acc: any, curr: any) => curr(acc), p)

export default compose
