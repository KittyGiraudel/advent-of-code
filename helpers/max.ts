/**
 * Alternative to `Math.max(…)` as it causes a ‘Maximum call stack size
 * exceeded’ error when passing too many items, so we have to resort to a good
 * ol’ loop.
 */
const max = (array: Array<number>) =>
  array.reduce((a, b) => Math.max(a, b ?? a), -Infinity)

export default max
