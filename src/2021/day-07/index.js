const sum = require('../../helpers/sum')

function getMedian(values) {
  values = values.slice(0).sort((a, b) => a - b)

  const half = Math.floor(values.length / 2)

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
}

const getAverage = values => sum(values) / values.length

const getTriangularNumber = upper => (upper * (1 + upper)) / 2

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
