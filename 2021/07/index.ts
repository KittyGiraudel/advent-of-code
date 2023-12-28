import $ from '../../helpers/'

export const getFuelConsumption = (numbers: number[]) => {
  const median = $.median(numbers)
  const getDistFromMedian = (number: number) => Math.abs(number - median)

  return $.sum(numbers.map(getDistFromMedian))
}

const getIncFuelConsumption = (
  numbers: number[],
  round: (number: number) => number = Math.round
) => {
  const average = round($.average(numbers))
  const getDistFromAverage = (number: number) => Math.abs(number - average)

  return $.sum(numbers.map(getDistFromAverage).map($.triangular))
}

export const getIncrementalFuelConsumption = (numbers: number[]) =>
  Math.min(
    getIncFuelConsumption(numbers, Math.ceil),
    getIncFuelConsumption(numbers, Math.floor)
  )
