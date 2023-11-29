import sum from './sum'

/**
 * Return the average value for the given numbers.
 * @param values - Numbers to get the average from
 */
const average = (values: Array<number>) => sum(values) / values.length

export default average
