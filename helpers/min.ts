/**
 * Alternative to `Math.min(…)` as it causes a ‘Maximum call stack size
 * exceeded’ error when passing too many items, so we have to resort to a good
 * ol’ loop.
 */
const min = (array: number[]) =>
  array.reduce((a, b) => Math.min(a, b ?? a), Infinity)

export default min
