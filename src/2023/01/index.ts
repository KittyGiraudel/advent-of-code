import $ from '../../helpers'

const DIGITS = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const DIGITS_RE = new RegExp(`(?=(\\d|${DIGITS.join('|')}))`, 'g')

// This more complicated approach is necessary to support overlapping matches.
// For instance, “oneight” should match both 1 and 8. However, using `$.match`
// causes 8 not to be found because the “e” was already captured as part of the
// 1 match, hence the internal regular expression pointer has moved at the “i”
// position, and cannot find “eight”.
const matchAll = (input: string) =>
  Array.from(input.matchAll(DIGITS_RE))
    .map(match => match[1])
    .map(value =>
      DIGITS.includes(value) ? String(DIGITS.indexOf(value) + 1) : value
    )

export const run = (input: string[], part2 = false) =>
  $.sum(
    input
      .map(line => (part2 ? matchAll(line) : $.match(line, /(\d)/g)))
      .map(matches => String(matches.at(0)) + String(matches.at(-1)))
      .map(Number)
  )
