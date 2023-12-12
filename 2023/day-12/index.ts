import $ from '../../helpers'

const cache: Record<string, string[]> = {}
const SUCCESSIVE_QUESTION_MARKS = /\?+/
const DOTS = /\.+/g
const HASH_GROUPS = /(#)\1*/g
const EDGE_DOTS = /^\.+|\.+$/g

const trim = (value: string) => value.replace(EDGE_DOTS, '')

const replacements = (input: string, variants: string[] = []): string[] =>
  input.indexOf('?') === -1
    ? [...variants, input]
    : [
        ...replacements(input.replace('?', '.'), variants),
        ...replacements(input.replace('?', '#'), variants),
      ]

const getVariants = (
  input: string,
  patternAsString: string,
  patternAsGroups: number[],
  count: number
): number => {
  // Remove the leading and trailing dots as they are irrelevant
  input = trim(input)

  // If there are no more question marks in the input, check whether it’s valid
  // before returning
  if (input.indexOf('?') === -1) {
    return patternize(input) === patternAsString ? count + 1 : count
  }

  // Find the first group of 1 or more successive question marks
  const [match] = $.match(input, SUCCESSIVE_QUESTION_MARKS)

  // Put its replacements in the cache if not yet in
  if (!(match in cache)) {
    cache[match] = replacements(match)
  }

  // For every replacement of the group of question marks…
  return cache[match].reduce((acc, variant) => {
    // … compute the next input be replacing the group with the current variant
    const next = input.replace(SUCCESSIVE_QUESTION_MARKS, variant)
    // … and break that next input on dots to have groups.
    const chunks = next.split(DOTS).filter(Boolean)

    let impossible = false

    // For each group until we find a group that’s incomplete (one that contains
    // a question mark), we check whether its length match the expected length
    // in the pattern. If it doesn’t we’ve reached a deadend and shouldn’t go
    // deeper.
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].includes('?')) break
      impossible = chunks[i].length !== patternAsGroups[i]
      if (impossible) break
    }

    // If we haven’t reached a dead end, go deeper.
    return impossible
      ? acc
      : acc + getVariants(next, patternAsString, patternAsGroups, count)
  }, count)
}

const patternize = (input: string) =>
  input.replace(HASH_GROUPS, match => String(match.length)).replace(DOTS, ',')

// I wasn’t able to figure out how to resolve part 2 in a decent amount of time,
// without computing every line on its own, caching it on disk and moving onto
// the next one, so I checked reddit. I’m not familiar with dynamic programming
// so I followed a couple of implementations to familiarize myself with the
// concept before copying/rewriting the code to better understand how it works.
// I get it, but I don’t think I’d be able to write something like this without
// help.
// See: https://github.com/jonathanpaulson/AdventOfCode/blob/master/2023/12.py
// See: https://pastecode.io/s/gvco1hhn
const dp = (line: string, groups: number[]) => {
  const cache: Map<string, number> = new Map()

  const resolve = (
    charIndex: number,
    groupIndex: number,
    consecutiveHashes: number
  ) => {
    const key = charIndex + '-' + groupIndex + '-' + consecutiveHashes

    if (cache.has(key)) {
      return cache.get(key) as number
    }

    // If the char counter has gone beyond the length of the line, it’s time to
    // return whether the line was valid.
    if (charIndex === line.length) {
      // If the group counter has gone beyond the amount of groups, and there is
      // no open group, the line is valid.
      if (groupIndex === groups.length && consecutiveHashes === 0) {
        return 1
      }

      // If the group counter is equals to the amount of groups, and the current
      // and last group is the right length, the line is valid.
      else if (
        groupIndex === groups.length - 1 &&
        groups[groupIndex] === consecutiveHashes
      ) {
        return 1
      }

      // Otherwise the line is invalid.
      return 0
    }

    let answer = 0
    const char = line[charIndex]

    // Then, we need to expand the line into its possible variants based on its
    // remaining question marks.

    // If the character is a hash (or a question mark changed into a hash), we
    // need to increment the current character index and the current amount of
    // consecutive hashes.
    if (char === '?' || char === '#') {
      answer += resolve(charIndex + 1, groupIndex, consecutiveHashes + 1)
    }

    // If the character is a dot (or a question mark changed into a dot), we
    // need have 2 possible options:
    // a. We weren’t collecting a suite of hashes, in which case we just bump
    //    the character index.
    // b. We we collecting a suite of hashes, and the amount of hashes in that
    //    suite matched what was expected from the pattern, in which case we
    //    bump the character index and the group index.
    // Any other case results in a dead end, hence there is no need for further
    // recursion.
    if (char === '?' || char === '.') {
      if (consecutiveHashes === 0) {
        answer += resolve(charIndex + 1, groupIndex, 0)
      } else if (
        consecutiveHashes > 0 &&
        groupIndex < groups.length &&
        groups[groupIndex] === consecutiveHashes
      ) {
        answer += resolve(charIndex + 1, groupIndex + 1, 0)
      }
    }

    cache.set(key, answer)

    return answer
  }

  return resolve
}

// This one is yet another version using dynamic programming, but using
// memoization instead of a manual cache, which is interesting. This is almost
// verbatim the code used by the person achieving #1 on the day.
// See: https://www.reddit.com/r/adventofcode/comments/18ge41g/comment/kd09kvj/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
// See: https://gist.github.com/Nathan-Fenner/781285b77244f06cf3248a04869e7161
const countWays = $.memo((line: string, groups: number[]): number => {
  // If the line is empty, it is considered valid if we have ran out of groups.
  // If there are still groups left, it means the line is invalid.
  if (line.length === 0) return groups.length === 0 ? 1 : 0

  // If the groups are empty, the line is considered valid only if there are no
  // more hashes, as we are not expecting any. If there is any, it means the
  // line is invalid.
  if (groups.length === 0) {
    for (let i = 0; i < line.length; i++) if (line[i] === '#') return 0
    return 1
  }

  // If the line is shorter than the minimum amount of characters necessary to
  // be valid, prune that branch as it cannot possibly be valid.
  if (line.length < $.sum(groups) + groups.length - 1) return 0

  // If the first character is a dot, remove it as it is irrelevant and move on
  if (line[0] === '.') return countWays(line.slice(1), groups)

  // If the first character is a hash, iterate as many times as the expected
  // group length; if we find any dot in these characters, prune that branch as
  // this is a dead end. Additionally, if we find a hash at the end of the
  // expected length, prune that branch as this means the hash group is going to
  // be too long. Otherwise go deeper by moving the cursor beyond the length of
  // the first group and removing that group.
  if (line[0] === '#') {
    const [firstGroup, ...otherGroups] = groups
    for (let i = 0; i < firstGroup; i++) if (line[i] === '.') return 0
    if (line[firstGroup] === '#') return 0
    return countWays(line.slice(firstGroup + 1), otherGroups)
  }

  // If the first character is a question mark, replace it with both variants
  // and go deeper.
  return (
    countWays('#' + line.slice(1), groups) +
    countWays('.' + line.slice(1), groups)
  )
})

export const run = (input: string[], advanced?: boolean) => {
  return $.sum(
    input.map(line => {
      let [input, pattern] = line.split(' ')
      let patternAsNumbers = $.numbers(pattern)

      if (advanced) {
        input = Array(5).fill(input).join('?')
        pattern = Array(5).fill(patternAsNumbers).join(',')
        patternAsNumbers = $.numbers(pattern)
      }

      return advanced
        ? // dp(input, patternAsNumbers)(0, 0, 0)
          countWays(input, patternAsNumbers)
        : // Preserving my P1 version, even though both dp and countWays work
          // fine for P1 as well.
          getVariants(input, pattern, patternAsNumbers, 0)
    })
  )
}
