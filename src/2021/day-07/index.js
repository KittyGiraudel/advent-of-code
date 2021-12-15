const sum = require('../../helpers/sum')
const getMedian = require('../../helpers/getMedian')
const getAverage = require('../../helpers/getAverage')
const getTriangularNumber = require('../../helpers/getTriangularNumber')

const getFuelConsumption = numbers => {
  const median = getMedian(numbers)

  return sum(numbers.map(number => Math.abs(number - median)))
}

const getIncFuelConsumption = (numbers, round = Math.round) => {
  const average = round(getAverage(numbers))

  return sum(
    numbers.map(number => Math.abs(number - average)).map(getTriangularNumber)
  )
}

const getIncrementalFuelConsumption = numbers =>
  Math.min(
    getIncFuelConsumption(numbers, Math.ceil),
    getIncFuelConsumption(numbers, Math.floor)
  )

module.exports = { getFuelConsumption, getIncrementalFuelConsumption }
