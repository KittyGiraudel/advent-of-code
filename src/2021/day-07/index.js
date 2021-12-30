const $ = require('../../helpers/')

const getFuelConsumption = numbers => {
  const median = $.getMedian(numbers)
  const getDistFromMedian = number => Math.abs(number - median)

  return $.sum(numbers.map(getDistFromMedian))
}

const getIncFuelConsumption = (numbers, round = Math.round) => {
  const average = round($.getAverage(numbers))
  const getDistFromAverage = number => Math.abs(number - average)

  return $.sum(numbers.map(getDistFromAverage).map($.getTriangularNumber))
}

const getIncrementalFuelConsumption = numbers =>
  Math.min(
    getIncFuelConsumption(numbers, Math.ceil),
    getIncFuelConsumption(numbers, Math.floor)
  )

module.exports = { getFuelConsumption, getIncrementalFuelConsumption }
