/**
 * Return an array of consecutive numbers of the expected size.
 * @param size - Amount of values in the resulting range
 * @param startAt - Initial value (included)
 */
const range = (size: number, startAt = 0) =>
  [...Array(size).keys()].map(i => i + startAt)

export default range
