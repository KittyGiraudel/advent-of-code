import $ from '../../helpers'

const DIGITS = ['2', '1', '0', '-', '=']
const VALUES = [2, 1, 0, -1, -2]

export const unsnafu = input => {
  let result = 0

  for (let i = 0; i < input.length; i++) {
    const digit = input[input.length - 1 - i]
    const index = DIGITS.indexOf(digit)
    const value = VALUES[index]

    result += 5 ** i * value
  }

  return result
}

// Honestly wasn’t sure how to do that part, so I had to look up some help on
// Reddit.
// Ref: https://www.reddit.com/r/adventofcode/comments/zur1an/comment/j1lcn13/
export const snafu = input => {
  let result = ''

  while (input > 0) {
    input += 2
    result = (input % 5) + result
    input = Math.floor(input / 5)
  }

  return $.stringMap(result, v => DIGITS[DIGITS.length - 1 - v])
}
