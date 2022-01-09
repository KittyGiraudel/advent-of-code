// Return the intersections of several arrays.
// @param {Array[]} arrays - Arrays to find the intersection of
// @return {Array}
const intersection = (...arrays) => {
  const result = new Set()

  for (let i = 0; i < arrays.length; i++) {
    for (let y = 0; y < arrays[i].length; y++) {
      if (arrays.every(obj => obj.includes(arrays[i][y])))
        result.add(arrays[i][y])
    }
  }

  return [...result]
}

module.exports = intersection
