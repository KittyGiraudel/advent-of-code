const applyVector = require('../../helpers/applyVector')

const DIRECTIONAL_VECTORS = [
  [-1, 0],
  [-1, +1],
  [0, +1],
  [+1, +1],
  [+1, 0],
  [+1, -1],
  [0, -1],
  [-1, -1],
]

// Read the position at the given X,Y coords in the layout.
// @param {String[]} layout - Seating layout
// @param {Number[]} coords - Set of X,Y coords
// @return {String|void}
const read = (layout, coords) => layout?.[coords[1]]?.[coords[0]]

// Get the first seat in layout in the direction given by vector from the given
// set of X,Y coords.
// @param {String[]} layout - Seating layout
// @param {Number[]} coords - Set of X,Y coords
// @param {Number[]} vector - Vector to walk
// @return {String|void}
const getFirstSeat = (layout, coords, vector) => {
  let position = applyVector(coords, vector)
  while (read(layout, position) === '.')
    position = applyVector(position, vector)
  return read(layout, position)
}

// Get the 8 seats around the one at given position.
// @param {String[]} layout - Seating layout
// @param {Number[]} coords - Set of X,Y coords
// @return {String[]}
const getAdjacentSeats = (layout, coords) =>
  DIRECTIONAL_VECTORS.map(vector => read(layout, applyVector(coords, vector)))

// Get the 8 visible seats around the one at given position.
// @param {String[]} layout - Seating layout
// @param {Number[]} coords - Set of X,Y coords
// @return {String[]}
const getVisibleSeats = (layout, coords) =>
  DIRECTIONAL_VECTORS.map(vector => getFirstSeat(layout, coords, vector))

// Process the given seat to know whether it will become occupied, empty, or
// stay the same.
// @param {Function} mapper - Mapper function to process every individual seat
// @param {Number} threshold - Threshold for when a seat gets empty
// @param {String[]} layout - Seating layout
// @param {Number} y - Y coord
// @param {Number} x - X coord
// @return {String}
const processSeat = (mapper, threshold) => (layout, y) => (seat, x) => {
  const count = countOccupiedSeats(mapper(layout, [x, y]))
  if (seat === 'L' && count === 0) return '#'
  if (seat === '#' && count >= threshold) return 'L'
  return seat
}

const processSeatLoose = processSeat(getAdjacentSeats, 4)
const processSeatStrict = processSeat(getVisibleSeats, 5)

// Process the entire seating layout.
// @param {String[]} layout - Seating layout
// @param {Function} mapper - Mapper function to process every individual seat
// @return {String[]}
const processLayout = (layout, mapper) =>
  layout.map((row, y) => row.split('').map(mapper(layout, y)).join(''))

// Count the amount of occupied seats in the given set.
// @param {String[]} seats - Set of seats
// @return {Number}
const countOccupiedSeats = seats => seats.join('').match(/#/g)?.length ?? 0

// Wait until the layout no longer changes, and count occupied seats.
// @param {String[]} layout - Seating layout
// @param {Function} mapper - Mapper function to process every individual seat
// @return {Number}
const waitAndCountOccupiedSeats = (layout, mapper) => {
  let curr = layout
  let next = processLayout(layout, mapper)

  while (curr.join('\n') !== next.join('\n')) {
    curr = next
    next = processLayout(curr, mapper)
  }

  return countOccupiedSeats(next)
}

module.exports = {
  processLayout,
  processSeatStrict,
  processSeatLoose,
  waitAndCountOccupiedSeats,
  getVisibleSeats,
}
