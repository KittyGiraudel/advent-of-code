const getKey = (...args: unknown[]) =>
  // If there is only one argument and it’s a safe key, or if the second
  // argument is a number (index when used with Array.prototype.map), bypass the
  // JSON serialization as it can be quite costly which would negate the memo
  // benefits entirely.
  {
    const count = args.length
    const safeKey = ['string', 'number'].includes(typeof args[0])
    const indexSecond = typeof args[1] === 'number'

    return (count === 1 && safeKey) || (count === 3 && safeKey && indexSecond)
      ? args[0]
      : JSON.stringify(args)
  }

/**
 * Memoize a function’s results using the JSON serialization of its arguments
 * as a key
 * @param fn - Function to memoize
 */
const memo = <Args extends unknown[], T>(fn: (...args: Args) => T) => {
  const cache = new Map()

  return (...args: Args): ReturnType<typeof fn> => {
    const key = getKey(...args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

export default memo
