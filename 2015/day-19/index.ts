import $ from '../../helpers'

const indicesOf = (string: string, from: string): number[] => {
  const indices = []
  const regex = new RegExp(from, 'g')

  let result: RegExpExecArray
  while ((result = regex.exec(string))) indices.push(result.index)

  return indices
}

const replaceAt = (
  value: string,
  from: string,
  index: number,
  to: string
): string => value.slice(0, index) + value.slice(index).replace(from, to)

export const calibrate = (input: string[]): number => {
  const molecule = $.last(input)
  const molecules = input.slice(0, -2).flatMap(replacement => {
    const [from, to] = replacement.split(' => ')
    const indices = indicesOf(molecule, from)

    return indices.map(index => replaceAt(molecule, from, index, to))
  })

  return new Set(molecules).size
}

// I attempted to brute-force part 2, to no avail. I definitely did not come up
// with that solution — I found it on Reddit. The idea is that by carefully
// inspecting the molecule, one would notice that `Rn` and `Ar` always come in
// pairs — akin to parentheses. Similarly, `Y*` also only shows up on the right
// side (as a replacement, not a token), so they should be discounted. And we
// should also subtract 1 because we start with `e`.
// Ref: https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4etju/
// Ref: https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4h7ji/
export const recompose = (input: string[]): number => {
  const molecule = $.last(input)
  const tokens = $.countInString(molecule, '[A-Z]', false)
  const Rn = $.countInString(molecule, 'Rn', false)
  const Ar = $.countInString(molecule, 'Ar', false)
  const Y = $.countInString(molecule, 'Y', false)

  return tokens - Rn - Ar - 2 * Y - 1
}
