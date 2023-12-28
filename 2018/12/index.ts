import $ from '../../helpers'

type Patterns = Record<string, string>

const count = (state: string[], offset: number) =>
  $.sum(state.map((char, index) => (char === '#' ? index - offset : 0)))

const getInitialState = (input: string) => Array.from(input.split(' ')[2])
const getPatterns = (input: string) =>
  input
    .split('\n')
    .map(line => line.split(' => '))
    .reduce<Patterns>(
      (acc, [pattern, outcome]) => ({ ...acc, [pattern]: outcome }),
      {}
    )

const padState = (state: string[], offset: number) => {
  if (state[0] === '#') state.unshift('.'), offset++
  if (state[1] === '#') state.unshift('.'), offset++
  if (state[state.length - 1] === '#') state.push('.')
  if (state[state.length - 2] === '#') state.push('.')

  return offset
}

// Get the slice of -2 to +2, padded with empty pots if necessary.
const getSlice = (state: string[], index: number) => {
  const min = Math.max(index - 2, 0)
  const max = Math.min(index + 3, state.length)
  const slice = state.slice(min, max).join('')

  if (index < 2) return slice.padStart(5, '.')
  if (index >= state.length - 2) return slice.padEnd(5, '.')
  return slice
}

const next = (curr: string[], patterns: Patterns) =>
  curr
    .map((_, index, array) => getSlice(array, index))
    .map(slice => patterns[slice] || '.')

export const cycle = (input: [string, string], cycles: number = 1) => {
  const [initial, instructions] = input
  const patterns = getPatterns(instructions)
  let curr = getInitialState(initial)
  let offset = 0
  let score = 0
  let inc = 0

  while (cycles--) {
    // If the current state has a plant at index 0, 1, n-2 or n-1, pad the state
    // with extra pots so the slicing works properly, and update the “offset”,
    // which is the position of the “anchor pot” (the initial zero).
    offset = padState(curr, offset)

    // Compute the next state of every pot based on their surroundings and
    // replace the current state with the new state.
    curr = next(curr, patterns)

    // Compute the next score.
    const nextScore = count(curr, offset)

    // If the difference between the new score and the current one is the same
    // as the difference between the previous score and the one before that, we
    // have reached equilibrium, and the final score can be computed.
    if (nextScore - score == inc) {
      return nextScore + cycles * inc
    }

    // Otherwise record the new increment as well as the score.
    inc = nextScore - score
    score = nextScore
  }

  // When done iterating, return the score.
  return score
}
