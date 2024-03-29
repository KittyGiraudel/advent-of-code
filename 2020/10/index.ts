import $ from '../../helpers'

// Count the amount of paths that go from the `current` value to the last one in
// sorted `input`.
// @param adapters - Array of adapters
// @param current - Current adapter in chain
// @param cache - Cache to make recursion faster (i.e. possible)
function countPathsToEnd(
  adapters: number[],
  current: number = adapters[0],
  cache = new Map<number, number>()
): number {
  // If we have already computed whether the current value leads to the device,
  // return the value from the cache.
  if (cache.has(current)) return cache.get(current) as number

  // If we’ve reached the device, count this path as a successful one, and cache
  // the result for faster computation.
  if (current === adapters[adapters.length - 1]) {
    cache.set(current, 1)
    return 1
  }

  // From the current adapter, find the next ones that are comprised between the
  // current adapter’s value +1 and +3. Then, compute the possible paths for
  // each of them recursively.
  const count = adapters
    .filter(value => $.isClamped(value, current + 1, current + 3))
    .reduce((acc, value) => acc + countPathsToEnd(adapters, value, cache), 0)

  // Once we have computed how many paths lead to the device from the current
  // adapter, store in the cache for faster compilation.
  cache.set(current, count)

  return count
}

// Add charging outlet (entry point at 0) and device built-in adapter (highest
// adapter + 3), and sort all adapters.
// @param adapters - Array of adapters
const sortAdapters = (adapters: number[]) =>
  [0, Math.max(...adapters) + 3].concat(adapters).sort((a, b) => a - b)

// Get the amount of 1 jolt difference times the amount of 3 jolts difference in
// the series of adapters.
// @param adapters - Array of adapters
export const getDifferenceProduct = (adapters: number[]) => {
  const numbers = sortAdapters(adapters)
  const diffs = [0, 0, 0]

  for (let i = 1; i < numbers.length; i++) {
    diffs[numbers[i] - numbers[i - 1] - 1]++
  }

  return diffs[0] * diffs[2]
}

// Count the amount of possible arrangements of adapters to go from the charging
// outlet (0) to the device (highest adapter joltage + 3).
// @param adapters - Array of adapters
export const countArrangements = (input: number[]) =>
  countPathsToEnd(sortAdapters(input))
