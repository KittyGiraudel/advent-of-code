import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { tetris } from './'

test('Day 17 — Sample', () => {
  const sample = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

  assert.strictEqual(tetris(sample), 3068)
})

test('Day 17 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(tetris(input), 3224)
  // Part 2 was done manually with a generous explanation found on Reddit.
  // The height after 1 trillion rocks is the height of the tower before the
  // cycle begins + the height done by full cycles + the height done by the
  // remaining unfinished cycle. I actually got super duper close without help
  // by computing everything by hand, but made a mistake in one of the values
  // (namely the height of the unfinished cycle at the top).
  // Ref: https://www.reddit.com/r/adventofcode/comments/znykq2/comment/j0km9dm/?utm_source=share&utm_medium=web2x&context=3
  // var height = (
  //   $.sum(front)
  //   + Math.floor((count - front.length) / cycle.length) * $.sum(cycle)
  //   + $.sum(cycle.slice(0, (count - front.length) % cycle.length))
  // )
})
