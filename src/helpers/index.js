const applyVector = require('./applyVector')
const chunk = require('./chunk')
const compose = require('./compose')
const countInString = require('./countInString')
const countOccurrences = require('./countOccurrences')
const createGrid = require('./createGrid')
const findGCD = require('./findGCD')
const findLCM = require('./findLCM')
const getAverage = require('./getAverage')
const getCombinations = require('./getCombinations')
const getMedian = require('./getMedian')
const {
  getBorderingCoords,
  getSurroundingCoords,
} = require('./getNeighborCoords')
const getPermutations = require('./getPermutations')
const getTriangularNumber = require('./getTriangularNumber')
const groupBy = require('./groupBy')
const hexToBin = require('./hexToBin')
const intersection = require('./intersection')
const isClamped = require('./isClamped')
const { gridMap, gridForEach, gridEvery } = require('./loopOnGrid')
const matchLast = require('./matchLast')
const product = require('./product')
const readInput = require('./readInput')
const stringMap = require('./stringMap')
const sum = require('./sum')
const toBin = require('./toBin')
const toDec = require('./toDec')
const updateAtIndex = require('./updateAtIndex')

module.exports = {
  applyVector,
  chunk,
  compose,
  countInString,
  countOccurrences,
  createGrid,
  findGCD,
  findLCM,
  getAverage,
  getBorderingCoords,
  getCombinations,
  getMedian,
  getPermutations,
  getSurroundingCoords,
  getTriangularNumber,
  gridMap,
  gridForEach,
  gridEvery,
  groupBy,
  hexToBin,
  intersection,
  isClamped,
  matchLast,
  product,
  readInput,
  stringMap,
  sum,
  toBin,
  toDec,
  updateAtIndex,
}
