import $ from '../../helpers'
import { Grid } from '../../types'

type Patterns = Record<string, string[]>
type Cache = Record<string, string[]>

const asGrid = (string: string) => $.Grid.fromRows<string>(string.split('/'))

const asString = (grid: Grid<string>) =>
  grid.rows.map(row => row.join('')).join('/')

const getPatterns = (lines: string[]) => {
  const patterns: Patterns = {}

  lines.forEach(line => {
    const [input, output] = line.split(' => ')
    const variants = asGrid(input).variants().map(asString)
    const out = output.split('/')

    // Pre-compute the 8 rotated varients of a given pattern to avoid having
    // to rotate the matrix instead.
    variants.forEach(variant => (patterns[variant] = out))
  })

  return patterns
}

const enhance = (
  curr: string[],
  patterns: Patterns,
  cache: Record<string, string[]> = {}
) => {
  let currStr = curr.join('/')
  type CacheKey = keyof typeof cache
  type PatternKey = keyof typeof patterns

  if (currStr in cache) return cache[currStr as CacheKey]

  const pattern = Object.keys(patterns).find(pattern => currStr === pattern)
  cache[currStr as CacheKey] = patterns[pattern as PatternKey]

  return cache[currStr as CacheKey]
}

// Disassemble a grid expressed as a string into several subgrids (expressed as
// strings as well).
const disassemble = (curr: string[]) => {
  // If the grid is as small as it can get (2 or 3 cells wide), it cannot be
  // broken down into subgrids.
  if (curr.length <= 3) return [curr]

  // First, break every row into chunks of the expected size. For instance,
  // `.##.` becomes `['.#', '#.']`.
  const size = curr.length % 2 === 0 ? 2 : 3
  const rows = curr.map(row => $.chunk(row, size))

  // Then, group rows into groups of the expected size, and zip their respective
  // items. For instance `[[0, 1], [2, 3]]` becomes `[[0, 2], [1, 3]]`.
  return $.chunk(rows, size).flatMap($.zip)
}

const reassemble = (grids: string[][]) => {
  // If there is only one subgrid, return it as there is nothing to reassemble.
  if (grids.length === 1) return grids[0]

  // Group grids into groups of the expected size, and zip their respective
  // items before flattening the whole thing.
  return $.chunk(grids, Math.sqrt(grids.length)).flatMap(group =>
    $.zip(group).map(grid => grid.join(''))
  )
}

const cycle = (curr: string[], patterns: Patterns, cache: Cache) => {
  let next = disassemble(curr).map(sub => enhance(sub, patterns, cache))
  return reassemble(next)
}

export const run = (input: string[], iterations: number = 1) => {
  const patterns = getPatterns(input)
  const cache: Cache = {}
  let curr = ['.#.', '..#', '###']

  while (iterations--) curr = cycle(curr, patterns, cache)

  return $.countInString(curr.join(''), '#')
}
