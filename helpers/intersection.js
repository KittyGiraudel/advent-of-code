// Return the intersections of several arrays. To do so, iterate over the items
// of the first array and preserve only the ones that exist in *all* the other
// arrays. If an item doesn’t exist in some arrays, it will not be returned. And
// because of looping on the first array only, items that are present in other
// arrays but not the first are also not returned.
// @param {Array[]} arrays - Arrays to find the intersection of
// @return {Array}
const intersection = (...arrays) =>
  Array.from(arrays.shift()).filter(item =>
    arrays.every(array => array.includes(item))
  )

export default intersection
