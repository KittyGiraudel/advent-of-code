import $ from '../../helpers'

const computeToken = (token: string) => $.product($.numbers(token))
const computeTokens = (tokens: string[]) => $.sum(tokens.map(computeToken))
const resolve =
  (part2: boolean) =>
  (acc: { enabled: boolean; tokens: string[] }, value: string) => {
    if (value === "don't()") acc.enabled = false
    else if (value === 'do()') acc.enabled = true
    else if (acc.enabled || !part2) acc.tokens.push(value)
    return acc
  }

export const run = (input: string[], part2 = false) => {
  const re = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g
  const acc = { enabled: true, tokens: [] }
  const tokens = Array.from(input.join('\n').match(re) ?? [])

  return computeTokens(tokens.reduce(resolve(part2), acc).tokens)
}
