import $ from '../../helpers'

type Item = { type: string; count: number }
type Map = Record<string, Item[]>

// Parse a restriction line into a type and an array of possible sub-types.
// @param restriction - Unparsed restriction
// @return Type and capacity
export const parseRestriction = (restriction: string) => {
  const [type, leftover] = restriction.trim().split(' bags contain ')
  const contains = leftover
    .split(', ')
    .map(part => $.match(part, /(\d+) ([\w\s]+) bags?/))
    .filter(match => match.length)
    .map(([, count, type]) => ({ type, count: +count }))

  return { type, contains }
}

// Transform an array of restrictions into an object mapping types to their
// possible sub-types.
// @param restrictions - Array of unparsed restrictions
// @return Map of restrictions
export const mapRestrictions = (restrictions: string[]) =>
  restrictions
    .filter(Boolean)
    .map(parseRestriction)
    .reduce<Map>(
      (map, { type, contains }) => ({ ...map, [type]: contains }),
      {}
    )

// Determine whether `entry` type can contain `expected` type, no matter the
// depth.
// @param map - Map of restrictions
// @param entry - Entry point type in the map
// @param expected - Expected type to find
// @return Whether `entry` type can contain `expected` type (deep)
export const canContain = (
  map: Map,
  entry: string,
  expected: string
): boolean =>
  entry === expected ||
  map[entry].some(item => canContain(map, item.type, expected))

// Count how many different types can contain `expected` type
// @param map - Map of restrictions
// @param expected - Expected type to find
// @return Amount of containers for `expected` type
export const countContainers = (map: Map, expected: string) =>
  Object.keys(map)
    .filter(type => type !== expected)
    .filter(type => canContain(map, type, expected)).length

// Count how many bags there are within given `entry` type (deep).
// @param map - Map of restrictions
// @param entry - Entry point type in the map
// @return Amount of bags within given `entry` type
export const countBagsWithin = (map: Map, entry: string): number =>
  map[entry].reduce(
    (acc, { count, type }) => acc + count * (1 + countBagsWithin(map, type)),
    0
  )

// This is a different approach written years later. It’s not necessarily better
// or faster, it’s just different. It uses BFS for the part 1 to figure out
// which bag type connects to the expected type. For part 2, it just walks the
// graph to find the total amount of bags, just like the other version.
export const run = (input: string[], part2 = false) => {
  const graph = input
    .map(parseRestriction)
    .reduce<Record<string, Record<string, number>>>(
      (acc, { type, contains }) => {
        if (!(type in acc)) acc[type] = {}
        contains.forEach(right => (acc[type][right.type] = right.count))
        return acc
      },
      {}
    )

  const countTypesContainingType = (expected: string) =>
    Object.keys(graph).filter(
      type =>
        $.search.bfs({
          start: type,
          isGoal: curr => curr === expected,
          getNext: curr => Object.keys(graph[curr]),
        }).end
    ).length - 1

  const countBagsWithin = (type: string, quantity = 1): number =>
    Object.entries(graph[type]).reduce(
      (acc, [key, value]) => acc + countBagsWithin(key, value * quantity),
      quantity
    )

  return part2
    ? countBagsWithin('shiny gold') - 1
    : countTypesContainingType('shiny gold')
}
