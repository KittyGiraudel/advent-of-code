// Count the amount of numbers which are higher than the previous one in the
// array.
// @param input - Array of numbers
export const countIncreases = (input: number[]) =>
  input.reduce(
    (acc, number, index, array) =>
      acc + (number > (array[index - 1] || number) ? 1 : 0),
    0
  )

// Count the amount of window of numbers (series of 3 successive items) which
// are higher than the previous one in the array.
// @param input - Array of numbers
export const countWindowIncreases = (input: number[]) =>
  countIncreases(
    input.reduce<number[]>(
      (acc, number, index, array) =>
        index < 2
          ? acc
          : [...acc, number + array[index - 1] + array[index - 2]],
      []
    )
  )
