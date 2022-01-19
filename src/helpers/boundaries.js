const boundaries = points => {
  const xs = points.map(point => point.x || point[0])
  const ys = points.map(point => point.y || point[1])
  const zs = points.map(point => point.z || point[2])

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
