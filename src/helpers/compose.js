// Compose a new function from the given functions.
// @param {Function[]} functions - Functions to compose together
// @return {Function}
const compose =
  (...functions) =>
  args =>
    functions.reduceRight((arg, fn) => fn(arg), args)

module.exports = compose
