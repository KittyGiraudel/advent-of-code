// Return the coords for the given seat encoding.
// @param {String} input - Seat encoding
// @return {Number[]} Set of X,Y coords
const getSeatCoords = input => {
  const x = [0, 127]
  const y = [0, 7]

  input.split('').forEach(char => {
    switch (char) {
      case 'F':
        x[1] -= Math.ceil((x[1] - x[0]) / 2)
        break
      case 'B':
        x[0] += Math.ceil((x[1] - x[0]) / 2)
        break
      case 'L':
        y[1] -= Math.ceil((y[1] - y[0]) / 2)
        break
      case 'R':
        y[0] += Math.ceil((y[1] - y[0]) / 2)
        break
    }
  })

  return [x[0], y[0]]
}

// Return the ID of a given seat encoding.
// @param {String} input - Seat encoding
// @return {Number} Seat ID
const getSeatId = input => {
  const [row, col] = getSeatCoords(input)
  return row * 8 + col
}

// Return the ID of the proper seat based on a list of seat encodings.
// @param {String[]} input - Seat encodings
// @return {Number} Seat ID
const findOwnSeat = input => {
  const ids = input
    .map(getSeatId)
    .map(Number)
    .sort((a, b) => a - b)

  return ids.find((id, index) => id !== index + Math.min(...ids)) - 1
}

module.exports = { getSeatCoords, getSeatId, findOwnSeat }
