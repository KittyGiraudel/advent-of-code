import sum from './sum'

// Return the average value for the given numbers.
// @param {number[]} values - Numbers to get the average from
// @return {number}
const average = (values: number[]): number => sum(values) / values.length

export default average
