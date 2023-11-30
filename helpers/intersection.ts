/**
 * Return the intersections of several arrays. To do so, iterate over the items
 * of the first array and preserve only the ones that exist in *all* the other
 * arrays. If an item doesn’t exist in some arrays, it will not be returned. And
 * because of looping on the first array only, items that are present in other
 * arrays but not the first are also not returned.
 */
const intersection = <T>(...arrays: T[][]) => {
  return Array.from(arrays.shift()!).filter((item: T) =>
    arrays.every((array: T[]) => array.includes(item))
  )
}

export default intersection
