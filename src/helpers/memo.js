// Memoize a function’s results using the JSON serialization of its arguments
// as a key
// @param {Function} fn - Function to memoize
// @return {Function}
const memo = fn => {
  const cache = new Map()

  return (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

module.exports = memo
