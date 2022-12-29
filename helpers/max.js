// `Math.max(…)` causes a ‘Maximum call stack size exceeded’ error when passing
// too many items, so we have to resort to a good ol’ loop.
// @param {Number[]} array - Array to find the maximum value of
// @return {Number}
const max = array => array.reduce((a, b) => Math.max(a, b), -Infinity)

export default max
