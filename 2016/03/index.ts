import $ from '../../helpers'

const isValid = ([a, b, c]: number[]) => a + b > c && a + c > b && b + c > a

export const run = (input: string[], part2: boolean = false) =>
  (part2
    ? $.chunk(input.map($.numbers), 3).flatMap($.zip)
    : input.map($.numbers)
  ).filter(isValid).length
