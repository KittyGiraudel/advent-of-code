// Zip several arrays into one by matching entries by index.
// @param {Array[]} arrays - Arrays to zip
// @retunr {Array}
const zip = (arr, ...arrs) =>
  arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]))

module.exports = zip
