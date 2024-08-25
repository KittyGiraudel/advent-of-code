/**
 * Return whether the given input is contained within min and max.
 * @param input - Value to clamp between min and max
 * @param min - Lower boundary (included)
 * @param max - Upperboundary (included)
 */
const isClamped = (input: number, min: number, max: number) =>
  input >= min && input <= max

export default isClamped
