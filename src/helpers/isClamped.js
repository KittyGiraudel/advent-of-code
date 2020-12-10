// Return whether the given input is contained within min and max.
// @param {Number} input - Input to validate
// @param {Number} min - Minimum
// @param {Number} max - Maximum
// @return {Boolena}
const isClamped = (input, min, max) => input >= min && input <= max

module.exports = isClamped
