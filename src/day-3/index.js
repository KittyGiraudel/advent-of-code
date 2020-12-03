const readInput = require('../helpers/readInput')

const isTree = char => char === '#'
const getTreeCountForSlope = (rows, vector) => {
  const width = rows[0].length
  const coords = [0, 0]
  const length = Math.ceil(rows.length / vector[1])

  return Array.from({ length }, _ => {
    const ping = rows[coords[1]][coords[0] % width]
    coords[0] += vector[0]
    coords[1] += vector[1]
    return ping
  }).filter(isTree).length
}

const getResult = (input, vectors) =>
  vectors.reduce((acc, vector) => acc * getTreeCountForSlope(input, vector), 1)

module.exports = { getTreeCountForSlope, getResult }
