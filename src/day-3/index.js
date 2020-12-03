const readInput = require('../helpers/readInput')

const split = row => row.split('')
const isTree = char => char === '#'
const getTreeCountForSlope = (input, vector) => {
  const rows = input.map(split)
  const width = rows[0].length
  const pings = []
  const coords = [0, 0]

  while (coords[1] < rows.length) {
    pings.push(rows[coords[1]][coords[0] % width])
    coords[0] += vector[0]
    coords[1] += vector[1]
  }

  return pings.filter(isTree).length
}

const getResult = (input, vectors) =>
  vectors.reduce((acc, vector) => acc * getTreeCountForSlope(input, vector), 1)

module.exports = { getTreeCountForSlope, getResult }
