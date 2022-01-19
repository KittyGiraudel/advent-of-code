const manhattan = (a, b) => {
  const aX = Array.isArray(a) ? a[0] : a.x
  const aY = Array.isArray(a) ? a[1] : a.y
  const aZ = (Array.isArray(a) ? a[2] : a.z) || 0
  const bX = Array.isArray(b) ? b[0] : b.x
  const bY = Array.isArray(b) ? b[1] : b.y
  const bZ = (Array.isArray(b) ? b[2] : b.z) || 0

  return Math.abs(bX - aX) + Math.abs(bY - aY) + Math.abs(bZ - aZ)
}

module.exports = manhattan
