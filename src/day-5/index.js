const getCoords = input => {
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

const getSeatId = input => {
  const [row, col] = getCoords(input)
  return row * 8 + col
}

module.exports = { getCoords, getSeatId }
