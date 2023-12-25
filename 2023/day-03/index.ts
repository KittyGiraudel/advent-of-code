import $ from '../../helpers'
import { Coords, Grid } from '../../types'

const isNumber = (input: string) => /\d/.test(input)
const isEmpty = (input: string) => input === '.'
const isSymbol = (input: string) => input && !isNumber(input) && !isEmpty(input)
const isGear = (input: string) => input === '*'

const getSurroundingNumber = (grid: Grid<string>) => (coords: Coords) => {
  let value = grid.get(coords)

  if (!isNumber(value)) {
    return 0
  }

  // Start to the right of the current value, and add a digit to the
  // current number for as long as we find a digit
  const x = coords[1]
  coords[1] = x + 1
  while (isNumber(grid.get(coords))) {
    value = value + grid.get(coords)
    coords[1]++
  }

  // Start to the left of the current value, and prepend a digit to the
  // current number for as long as we find a digit
  coords[1] = x - 1
  while (isNumber(grid.get(coords))) {
    value = grid.get(coords) + value
    coords[1]--
  }

  return +value
}

export const getGearRatio = (input: string[]) => {
  const grid = $.Grid.fromRows<string>(input)

  return grid.reduce<number>((acc, item, ...coords) => {
    // Only consider gears, and ignore anything else.
    if (!isGear(item)) return acc

    // Retrieve the surrounding numbers from the gear. Beware: numbers can be
    // returned twice. For instance in the following case, 35 will be returned
    // twice because it will be retrieve from the 3 and retrieved from the 5
    // individually.
    // . . * .
    // . 3 5 .
    const neighbors = $.surrounding(coords, 'COORDS')
    const numbers = neighbors.map(getSurroundingNumber(grid))

    // Because of the way I retrieve surrounding numbers, I had to assume that
    // gears were *not* surrounded by twice the same number, which turned out
    // fine for my input, but may not be a correct for all inputs.
    const uniqueNumbers = $.unique(numbers)
    const nonZeroNumbers = uniqueNumbers.filter(value => value !== 0)
    const product = $.product(nonZeroNumbers)

    return acc + (nonZeroNumbers.length === 2 ? product : 0)
  }, 0)
}

export const run = (input: string[], part2: boolean = false) => {
  const grid = $.Grid.fromRows<string>(input)
  const getValue = (coords: Coords) => grid.get(coords)
  type State = { current: number; total: number; symbol: boolean }

  if (part2) {
    return getGearRatio(input)
  }

  return grid.reduce<State>(
    (acc, value, ...coords) => {
      if (isNumber(value)) {
        // Because we iterate left-to-right, and because numbers are always
        // contained within a single row, we can safely compose our number
        // during iteration. This is the same as doing a string concatenation.
        acc.current = acc.current * 10 + Number(value)
        // If the current value is a number, we want to know whether it has a
        // symbol surrounding it. To do so, get the neighbors of the current
        // cell and retrieve their value. Then, preserve only the symbols (not a
        // number and not empty). Finally, record that we found a symbol.
        acc.symbol ||=
          $.surrounding(coords, 'COORDS').map(getValue).filter(isSymbol)
            .length > 0
      }

      // When we reach a non-number (either a symbol or an empty space), we need
      // to record the current number (if any, otherwise +'' is 0), and reset
      // the current number and symbol to start again.
      else {
        if (isSymbol(value)) acc.symbol = true
        if (acc.symbol && acc.current) acc.total += acc.current
        acc.current = 0
        acc.symbol = false
      }

      return acc
    },
    { current: 0, symbol: false, total: 0 }
  ).total
}
