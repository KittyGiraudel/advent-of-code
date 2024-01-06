import $ from '../../helpers'

type Cache = Map<string, string>
type Fixes = Record<string, string>

// If the rule contains a pipe, wrap it in a non-capturing group as it needs to
// be scoped to be meaningful on its one. The group has to be non-capturing to
// avoid a “too many captures” error, and to speed up compilation.
// @param rule - Rule to wrap
const wrap = (rule: string) => (rule.includes('|') ? '(?:' + rule + ')' : rule)

// Recursively resolve a rule by replacing its numbers by their associated rules
// in the map. The depth parameter is used for part 2, and arbitrarily scoped to
// 4, the minimum depth needed to resolve the puzzle. Not my finest work.
// @param rule - Rule to resolve
// @param map - Storage map
// @param depth - Internal depth parameter; do not fill
const resolveRule = (rule: string, map: Cache, depth: number = 0): string =>
  rule.replace(/\d+/g, match =>
    depth > 4
      ? match
      : wrap(resolveRule(map.get(match) as string, map, depth + 1))
  )

// Get the resolved regular expression for the rules, applying fixes beforehand
// if any.
// @param input - Raw rules input
// @param fixes - Object of fixes (line -> fixed line)
const getRegularExpression = (input: string, fixes: Fixes) => {
  const map = input
    .replace(/"/g, '')
    .split('\n')
    .map(line => (line in fixes ? fixes[line] : line))
    .map(line => $.match(line, /^(\d+): (.+)$/))
    .reduce(
      (acc, match) => acc.set(match[1], match[2]),
      new Map<string, string>()
    )

  for (let [key, value] of map.entries()) {
    map.set(key, resolveRule(value, map))
  }

  return new RegExp('^' + map.get('0')!.replace(/\s+/g, '') + '$')
}

// Count the amount of messages matching rules.
// @param rules - Raw block of rules
// @param input - Raw block of messages
// @param fixes - Object of fixes (line -> fixed line)
export const count = (rules: string, input: string, fixes: Fixes = {}) => {
  const expression = getRegularExpression(rules, fixes)

  return input.split('\n').filter(message => expression.test(message)).length
}
