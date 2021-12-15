const identity = value => value
const createGrid = (rows, mapper = identity) =>
  rows.map(row => row.split('').map(mapper))

module.exports = createGrid
