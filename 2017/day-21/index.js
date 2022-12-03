const $ = require('../../helpers')

const asGrid = string => string.split('/').map(row => Array.from(row))
const asString = grid => grid.map(row => row.join('')).join('/')

const getPatterns = lines => {
  const patterns = {}

  lines.forEach(line => {
    const [input, output] = line.split(' => ')
    const variants = $.grid.variants(asGrid(input)).map(asString)
    const out = output.split('/')

    // Pre-compute the 8 rotated varients of a given pattern to avoid having
    // to rotate the matrix instead.
    variants.forEach(variant => (patterns[variant] = out))
  })

  return patterns
}

const enhance = (curr, patterns, cache) => {
  curr = curr.join('/')

  if (curr in cache) return cache[curr]

  const pattern = Object.keys(patterns).find(pattern => curr === pattern)
  cache[curr] = patterns[pattern]

  return cache[curr]
}

// Disassemble a grid expressed as a string into several subgrids (expressed as
// strings as well).
const disassemble = curr => {
  // If the grid is as small as it can get (2 or 3 cells wide), it cannot be
  // broken down into subgrids.
  if (curr.length <= 3) return [curr]

  // First, break every row into chunks of the expected size. For instance,
  // `.##.` becomes `['.#', '#.']`.
  const size = curr.length % 2 === 0 ? 2 : 3
  const rows = curr.map(row => $.chunk(row, size))

  // Then, group rows into groups of the expected size, and zip their respective
  // items. For instance `[[0, 1], [2, 3]]` becomes `[[0, 2], [1, 3]]`.
  return $.chunk(rows, size)
    .map(group => $.zip(...group))
    .flat()
}

const reassemble = grids => {
  // If there is only one subgrid, return it as there is nothing to reassemble.
  if (grids.length === 1) return grids[0]

  // Group grids into groups of the expected size, and zip their respective
  // items before flattening the whole thing.
  return $.chunk(grids, Math.sqrt(grids.length))
    .map(group => $.zip(...group).map(grid => grid.join('')))
    .flat()
}

const cycle = (curr, patterns, cache) => {
  curr = disassemble(curr)
  curr = curr.map(sub => enhance(sub, patterns, cache))
  curr = reassemble(curr)
  return curr
}

const run = (input, iterations = 1) => {
  const patterns = getPatterns(input)
  const cache = {}
  let curr = ['.#.', '..#', '###']

  while (iterations--) curr = cycle(curr, patterns, cache)

  return $.countInString(curr.join(''), '#')
}

module.exports = { run }
