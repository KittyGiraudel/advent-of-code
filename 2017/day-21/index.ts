import $ from '../../helpers'
import { Grid } from '../../types'

type Patterns = {
  [key: string]: string[]
}

type Cache = {
  [key: string]: string[]
}

const asGrid = (string: string): Grid<string> =>
  string.split('/').map(row => Array.from(row))

const asString = (grid: Grid<string>): string =>
  grid.map(row => row.join('')).join('/')

const getPatterns = (lines: string[]): Patterns => {
  const patterns: Patterns = {}

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

const enhance = (curr: string[], patterns: Patterns, cache: {}): string[] => {
  let currStr = curr.join('/')

  if (currStr in cache) return cache[currStr]

  const pattern = Object.keys(patterns).find(pattern => currStr === pattern)
  cache[currStr] = patterns[pattern]

  return cache[currStr]
}

// Disassemble a grid expressed as a string into several subgrids (expressed as
// strings as well).
const disassemble = (curr: string[]): string[][] => {
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
    .flat() as string[][]
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

const cycle = (curr: string[], patterns: Patterns, cache: Cache): string[] => {
  let next = disassemble(curr)
  next = next.map(sub => enhance(sub, patterns, cache))
  next = reassemble(next)
  return next
}

export const run = (input: string[], iterations: number = 1): number => {
  const patterns = getPatterns(input)
  const cache: Cache = {}
  let curr = ['.#.', '..#', '###']

  while (iterations--) curr = cycle(curr, patterns, cache)

  return $.countInString(curr.join(''), '#')
}
