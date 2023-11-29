import $ from '../../helpers/'

export const getFuelConsumption = (numbers: Array<number>): number => {
  const median = $.median(numbers)
  const getDistFromMedian = (number: number) => Math.abs(number - median)

  return $.sum(numbers.map(getDistFromMedian))
}

const getIncFuelConsumption = (
  numbers: Array<number>,
  round: (number: number) => number = Math.round
): number => {
  const average = round($.average(numbers))
  const getDistFromAverage = (number: number) => Math.abs(number - average)

  return $.sum(numbers.map(getDistFromAverage).map($.triangular))
}

export const getIncrementalFuelConsumption = (numbers: Array<number>): number =>
  Math.min(
    getIncFuelConsumption(numbers, Math.ceil),
    getIncFuelConsumption(numbers, Math.floor)
  )
