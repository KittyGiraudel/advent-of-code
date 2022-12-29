// Return the product of all values in array, starting with initial value.
// @param {Number[]} values - Values to get the product of
// @return {Number}
const product = (array, init = 1) => array.reduce((a, b) => a * b, init)

export default product
