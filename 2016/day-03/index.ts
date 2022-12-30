import $ from '../../helpers'

const isValid = ([a, b, c]: [number, number, number]): boolean =>
  a + b > c && a + c > b && b + c > a

export const run = (input: string[]): [number, number] => {
  const lines = input.map(line => line.match(/\d+/g).map(Number))
  const part1 = lines.filter(isValid).length
  const part2 = $.chunk(lines, 3)
    .map(chunk => $.zip(...chunk))
    .flat()
    .filter(isValid).length

  return [part1, part2]
}