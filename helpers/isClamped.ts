// Return whether the given input is contained within min and max.
const isClamped = (input: number, min: number, max: number): boolean =>
  input >= min && input <= max

export default isClamped
