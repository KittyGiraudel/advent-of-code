const $ = require('../../helpers/')

const getFuelConsumption = numbers => {
  const median = $.median(numbers)
  const getDistFromMedian = number => Math.abs(number - median)

  return $.sum(numbers.map(getDistFromMedian))
}

const getIncFuelConsumption = (numbers, round = Math.round) => {
  const average = round($.average(numbers))
  const getDistFromAverage = number => Math.abs(number - average)

  return $.sum(numbers.map(getDistFromAverage).map($.triangular))
}

const getIncrementalFuelConsumption = numbers =>
  Math.min(
    getIncFuelConsumption(numbers, Math.ceil),
    getIncFuelConsumption(numbers, Math.floor)
  )

module.exports = { getFuelConsumption, getIncrementalFuelConsumption }
