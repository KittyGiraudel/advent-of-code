import $ from '../../helpers'

type Rating = { x: number; m: number; a: number; s: number }
type Ranges = {
  x: [number, number]
  m: [number, number]
  a: [number, number]
  s: [number, number]
}
type Key = keyof Ranges

const sumRating = (rating: Rating) => $.sum(Object.values(rating))

const parseRating = (line: string) =>
  JSON.parse(
    line.replace(/{/g, '{"').replace(/=/g, '":').replace(/,/g, ',"')
  ) as Rating

const optimize = (eq: string) =>
  eq
    .replace(/ \? true : false/g, '')
    .replace(/[xmas] [<>] \d+ \? true : true/g, 'true')
    .replace(/[xmas] [<>] \d+ \? false : false/g, 'false')
    .replace(/([xmas]) < (\d+) \? false : true/g, '$1 >= $2')
    .replace(/([xmas]) > (\d+) \? false : true/g, '$1 <= $2')
    .replace(/[xmas] [<>] \d+ \|\| true/g, 'true')
    .replace(/ \|\| false/g, '')

const buildEquation = (input: string) => {
  const map = input
    .split('\n')
    .map(line => {
      const [, name, rest] = $.match(line, /(\w+){([^}]+)}/)

      return {
        name,
        content: optimize(
          rest
            // Make actual ternaries
            .replace(/:/g, ' ? ')
            .replace(/,/g, ' : ')
            // Return actual booleans
            .replace(/A/g, 'true')
            .replace(/R/g, 'false')
            // Improve spacing
            .replace(/\</g, ' < ')
            .replace(/\>/g, ' > ')
        ),
      }
    })
    .reduce<Record<string, string>>(
      (acc, { name, content }) => ({ ...acc, [name]: content }),
      {}
    )

  const re = /\b([a-z]{2,3})(?:\b|$)/g
  let eq = map.in

  while (re.test(eq)) eq = optimize(eq.replace(re, name => map[name]))

  return `(({ x, m, a, s }) => ${eq})`
}

const createMap = (input: string) =>
  input.split('\n').reduce<Record<string, string[]>>((acc, line) => {
    const [key, value] = line.split('{')
    acc[key] = value.slice(0, -1).split(',')
    return acc
  }, {})

const size = (ranges: Ranges) => {
  let result = 1
  for (const range of Object.values(ranges)) result *= range[1] - range[0] + 1
  return result
}

// Shamelessly taken from this solution Python solution found on Reddit:
// https://github.com/knosmos/advent-2023/blob/main/19/19b.py
// I am firmly convinced that I could have fucked around the code for several
// more hours and have gotten closer and closer to the solution without ever
// finding it properly. I’m fine with not being able to solve that.
const process = (
  map: ReturnType<typeof createMap>,
  ranges: Ranges,
  key: keyof ReturnType<typeof createMap>
): number => {
  let result = 0

  map[key].forEach(part => {
    if (!part.includes(':')) {
      if (part === 'A') result += size(ranges)
      else if (part !== 'R') result += process(map, ranges, part)
    } else {
      const [condition, outcome] = part.split(':')
      const nextRanges = structuredClone(ranges)
      const [a, b] = condition.split(/[<>]/)
      const key = a as Key
      const value = +b
      const [lower, upper] = [0, 1]
      const curr = ranges[key]
      const next = nextRanges[key]

      if (condition.includes('>') && curr[upper] > value) {
        next[lower] = Math.max(curr[lower], value + 1)
        if (outcome === 'A') result += size(nextRanges)
        else if (outcome !== 'R') result += process(map, nextRanges, outcome)
        curr[upper] = Math.min(curr[upper], value)
      }

      if (condition.includes('<') && curr[lower] < value) {
        next[upper] = Math.min(curr[upper], value - 1)
        if (outcome === 'A') result += size(nextRanges)
        else if (outcome !== 'R') result += process(map, nextRanges, outcome)
        curr[lower] = Math.max(curr[lower], value)
      }
    }
  })

  return result
}

export const run = (input: [string, string], part2 = false) => {
  const ratings = input[1].split('\n').map(parseRating)

  // Part 1 was kinda fun: I solved it a in few different ways. First by kinda
  // awkwardly parsing and resolving every line recursively from `in`. Then by
  // composing a meta equation, thinking I could solve part 2 like this. I could
  // not; but still, was fun.
  const equation = buildEquation(input[0])
  const solveRating = (rating: Rating) =>
    eval(`${equation}(${JSON.stringify(rating)})`)

  const ranges: Ranges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  }

  return part2
    ? process(createMap(input[0]), ranges, 'in')
    : $.sum(ratings.filter(solveRating).map(sumRating))
}
