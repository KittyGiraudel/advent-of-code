// Retrieve the minimum and maximum values of a set of coordinates, reading
// x, y, z keys if existing, otherwising array indices, thus providing support
// for both types of data structures. It returns an array on purposes as the
// order of channels may vary (sometimes X comes first, sometimes Y does).
// @param {Object[]|Array[]} points - Array of coordinates
// @return {Number[]}
const boundaries = points => {
  const xs = points.map(point => point.x ?? point[0])
  const ys = points.map(point => point.y ?? point[1])
  const zs = points.map(point => point.z ?? point[2])

  return [
    Math.min(...xs),
    Math.max(...xs),
    Math.min(...ys),
    Math.max(...ys),
    Math.min(...zs),
    Math.max(...zs),
  ]
}

module.exports = boundaries
