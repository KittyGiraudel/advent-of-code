const getKey = <Args extends unknown[]>(...args: Args): string =>
  // If there is only one argument and it’s a safe key, or if the second
  // argument is a number (index when used with Array.prototype.map), bypass the
  // JSON serialization as it can be quite costly which would negate the memo
  // benefits entirely.
  {
    const count = args.length
    const safeKey = ['string', 'number'].includes(typeof args[0])
    const indexSecond = typeof args[1] === 'number'

    return (count === 1 && safeKey) || (count === 3 && safeKey && indexSecond)
      ? String(args[0])
      : JSON.stringify(args)
  }

/**
 * Memoize a function’s results using the JSON serialization of its arguments
 * as a key
 * @param fn - Function to memoize
 */
const memo = <Args extends unknown[], T>(
  fn: (...args: Args) => T,
  { cacheKey }: { cacheKey: (...args: Parameters<typeof fn>) => string } = {
    cacheKey: getKey,
  }
) => {
  const cache = new Map<string, ReturnType<typeof fn>>()

  return (...args: Args): ReturnType<typeof fn> => {
    const key = cacheKey(...args)
    if (cache.has(key)) return cache.get(key)!
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

export default memo
