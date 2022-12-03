// Split the given array into chunks of the given size.
// @param {Array} array - Array to be sliced
// @param {Number} size - Size of each chunk
// @return {Array[]}
const chunk = (array, size) => {
  const res = []

  for (let i = 0; i < array.length; i += size)
    res.push(array.slice(i, i + size))

  return res
}

module.exports = chunk
