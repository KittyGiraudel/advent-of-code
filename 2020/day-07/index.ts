type Item = { type: string; count: number }
type Map = Record<string, Item[]>

// Parse a restriction line into a type and an array of possible sub-types.
// @param restriction - Unparsed restriction
// @return Type and capacity
export const parseRestriction = (restriction: string) => {
  const [type, leftover] = restriction.trim().split(' bags contain ')
  const contains = leftover
    .split(',')
    .map(part => part.trim().match(/(\d+) ([\w\s]+) bags?/))
    .filter(Boolean)
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
    .reduce(
      (map, { type, contains }) => ({ ...map, [type]: contains }),
      {} as Map
    )

// Determine whether `entry` type can contain `expected` type, no matter the
// depth.
// @param map - Map of restrictions
// @param entry - Entry point type in the map
// @param expected - Expected type to find
// @return Whether `entry` type can contain `expected` type (deep)
export const canContain = (map: Map, entry: string, expected: string) =>
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
export const countBagsWithin = (map: Map, entry: string) =>
  map[entry].reduce(
    (acc, { count, type }) => acc + count * (1 + countBagsWithin(map, type)),
    0
  )
