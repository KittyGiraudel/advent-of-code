import $ from '../../helpers'
import { Coords, Grid } from '../../types'

const DIRECTIONAL_VECTORS: Coords[] = [
  [-1, 0],
  [-1, +1],
  [0, +1],
  [+1, +1],
  [+1, 0],
  [+1, -1],
  [0, -1],
  [-1, -1],
]

// Get the first seat in layout in the direction given by vector from the given
// set of Y,X coords.
// @param layout - Seating layout
// @param coords - Set of Y,X coords
// @param vector - Vector to walk
const getFirstSeat = (layout: Grid<string>, coords: Coords, vector: Coords) => {
  let position = $.applyVector(coords, vector)
  while (layout.at(position) === '.') position = $.applyVector(position, vector)
  return layout.at(position)
}

// Get the 8 seats around the one at given position.
// @param layout - Seating layout
// @param coords - Set of Y,X coords
const getSurroundingSeats = (layout: Grid<string>, coords: Coords) =>
  $.surrounding(coords).map(neighbor => layout.at(neighbor))

// Get the 8 visible seats around the one at given position.
// @param layout - Seating layout
// @param coords - Set of Y,X coords
export const getVisibleSeats = (layout: Grid<string>, coords: Coords) =>
  DIRECTIONAL_VECTORS.map(vector => getFirstSeat(layout, coords, vector))

// Process the given seat to know whether it will become occupied, empty, or
// stay the same.
// @param counter - Mapper function to process every individual seat
// @param threshold - Threshold for when a seat gets empty
const processSeat =
  (
    counter: typeof getSurroundingSeats | typeof getVisibleSeats,
    threshold: number
  ) =>
  (layout: Grid<string>) =>
  (seat: string, coords: Coords) => {
    const count = countOccupiedSeats(counter(layout, coords))
    if (seat === 'L' && count === 0) return '#'
    if (seat === '#' && count >= threshold) return 'L'
    return seat
  }

export const processSeatLoose = processSeat(getSurroundingSeats, 4)
export const processSeatStrict = processSeat(getVisibleSeats, 5)

// Process the entire seating layout.
// @param layout - Seating layout
// @param processor - Mapper function to process every individual seat
export const processLayout = (
  layout: Grid<string>,
  processor: typeof processSeatLoose | typeof processSeatStrict
) => layout.map(processor(layout))

// Count the amount of occupied seats in the given set.
// @param seats - Set of seats
const countOccupiedSeats = (seats: string[]) =>
  $.countInString(seats.join(''), '#')

// Wait until the layout no longer changes, and count occupied seats.
// @param layout - Seating layout
// @param processor - processor function to process every individual seat
export const waitAndCountOccupiedSeats = (
  layout: string[],
  processor: typeof processSeatLoose | typeof processSeatStrict
) => {
  let curr = $.Grid.fromRows(layout)
  let next = processLayout(curr, processor)

  while (curr.render() !== next.render()) {
    curr = next
    next = processLayout(curr, processor)
  }

  return countOccupiedSeats(next.rows.map(row => row.join('')))
}
