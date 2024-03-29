const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

const makeRegExp = (pairs: string[]) => new RegExp('(' + pairs.join('|') + ')')
const GLOBAL_RE = makeRegExp(
  ALPHABET.flatMap(letter => [
    letter + letter.toUpperCase(),
    letter.toUpperCase() + letter,
  ])
)

export const findShortestPolymer = (input: string) =>
  Math.min(
    ...ALPHABET.map(letter => new RegExp(letter, 'ig'))
      .map(re => input.replace(re, ''))
      .map(polymer => reduce(polymer))
      .map(polymer => polymer.length)
  )

export const reduce = (input: string) => {
  // This is my initial version, which works fine but is super slow because it
  // uses a big regular expression on a big string I guess.
  /*
  while (GLOBAL_RE.test(input)) input = input.replace(GLOBAL_RE, '')
  return input
  */

  // This version has been taken from Reddit, and is incredibly faster than mine
  // considering it relies on the fact that XOR of A and a, B and b, etc is 32.
  // https://www.reddit.com/r/adventofcode/comments/a3912m/2018_day_5_solutions/
  return Array.from(input)
    .reduce<string[]>((acc, char) => {
      if (
        !acc.length ||
        (acc[acc.length - 1].charCodeAt(0) ^ char.charCodeAt(0)) !== 32
      )
        acc.push(char)
      else acc.pop()
      return acc
    }, [])
    .join('')
}
