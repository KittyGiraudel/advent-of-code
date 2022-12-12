const $ = require('../../helpers')

const findBoundaries = claims =>
  claims.reduce(
    (acc, claim) => ({
      xMax: Math.max(claim.xMax, acc.xMax),
      yMax: Math.max(claim.yMax, acc.yMax),
    }),
    { xMax: -Infinity, yMax: -Infinity }
  )

// This is a bit of an ugly solution, because it’s incredibly slow. It would
// fail miserably on any input that’s bigger than that (either in terms of
// amount of claims, or in terms of size). But I couldn’t figure out the logic
// to figure out the right result based on intersections only.
// So this one literally renders every rectangle, then groups the inches based
// on how many times they were drawn over. The final result is found
// discarding the inches that have not been drawn over at all, or only once (no
// intersection), and that’s the result.
// @param {String[]} input - Raw unparsed lines
// @return {Number}
const countOverlappingInches = input => {
  const claims = parseClaims(input)
  const boundaries = findBoundaries(claims)
  const grid = $.grid.init(boundaries.xMax + 1, boundaries.yMax + 1, 0)

  claims.forEach(({ xMin, xMax, yMin, yMax }) => {
    for (let x = xMin; x <= xMax; x++)
      for (let y = yMin; y <= yMax; y++) grid[y][x]++
  })

  const counts = $.count(grid.flat())

  delete counts['0']
  delete counts['1']

  return $.sum(Object.values(counts))
}

const getIntersection = (a, b) => {
  const xMin = Math.max(a.xMin, b.xMin)
  const xMax = Math.min(a.xMax, b.xMax)
  const yMin = Math.max(a.yMin, b.yMin)
  const yMax = Math.min(a.yMax, b.yMax)

  if (xMin > xMax || yMin > yMax) return null

  return { xMin, xMax, yMin, yMax }
}

const parseClaims = lines =>
  lines
    .map(line => line.match(/(\d+)/g).map(Number))
    .map(([id, xMin, yMin, width, height]) => ({
      id,
      xMin,
      xMax: xMin + width - 1,
      yMin,
      yMax: yMin + height - 1,
    }))

// Find the one claim that does not overlap with any other. To do so, iterate
// over every claim, and for each claim, compute the intersection with every
// other claim (besides itself) in the list. The one with no intersection is the
// final one!
// @param {String[]} input - Raw unparsed lines
// @return {Number}
const detect = input =>
  parseClaims(input).find(
    (claim, _, array) =>
      array
        .filter(c => c.id !== claim.id)
        .filter(b => getIntersection(claim, b)).length === 0
  ).id

module.exports = { detect, countOverlappingInches }
