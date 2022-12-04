const $ = require('../../helpers')

const parseRange = range => range.split('-').map(Number)
const parseLine = line => line.split(',').map(parseRange)

const includes = (a, b) => {
  if (a[0] >= b[0] && a[1] <= b[1]) return true
  if (b[0] >= a[0] && b[1] <= a[1]) return true
  return false
}

const intersects = (a, b) => {
  if (a[1] >= b[0] && a[0] <= b[1]) return true
  if (a[0] >= b[1] && a[1] <= b[0]) return true
  return false
}

const getInclusions = lines =>
  lines.map(parseLine).filter(([a, b]) => includes(a, b))

const getOverlaps = lines =>
  lines.map(parseLine).filter(([a, b]) => includes(a, b) || intersects(a, b))

module.exports = { getInclusions, getOverlaps }
