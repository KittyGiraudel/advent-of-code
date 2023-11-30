import $ from '../../helpers'

type Triplet = [number, number, number]

const isValid = ([a, b, c]: Triplet) => a + b > c && a + c > b && b + c > a

export const run = (input: string[]): [number, number] => {
  const lines = input.map(
    line => line.match(/\d+/g)?.map(Number) ?? []
  ) as Triplet[]
  const part1 = lines.filter(isValid).length
  const part2 = (
    $.chunk(lines, 3)
      .map(chunk => $.zip(...chunk))
      .flat() as Triplet[]
  ).filter(isValid).length

  return [part1, part2]
}
