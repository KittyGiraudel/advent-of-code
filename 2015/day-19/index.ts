import $ from '../../helpers'

const replaceAt = (value: string, from: string, index: number, to: string) =>
  value.slice(0, index) + value.slice(index).replace(from, to)

export const calibrate = (input: string[]) => {
  const molecule = input.at(-1)!

  if (!molecule) {
    throw new Error('Cannot get molecule for calibration')
  }

  const molecules = input.slice(0, -2).flatMap(replacement => {
    const [from, to] = replacement.split(' => ')
    const indices = $.indices(molecule, from)

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
export const recompose = (input: string[]) => {
  const molecule = input.at(-1)!
  const tokens = $.countInString(molecule, '[A-Z]', false)
  const Rn = $.countInString(molecule, 'Rn', false)
  const Ar = $.countInString(molecule, 'Ar', false)
  const Y = $.countInString(molecule, 'Y', false)

  return tokens - Rn - Ar - 2 * Y - 1
}
