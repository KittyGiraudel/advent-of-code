const manhattan = (a, b) => {
  const aX = Array.isArray(a) ? a[0] : a.x
  const aY = Array.isArray(a) ? a[1] : a.y
  const bX = Array.isArray(b) ? b[0] : b.x
  const bY = Array.isArray(b) ? b[1] : b.y

  return Math.abs(bX - aX) + Math.abs(bY - aY)
}

module.exports = manhattan
