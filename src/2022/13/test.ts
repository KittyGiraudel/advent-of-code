import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { compare, getScore, sort } from './'

test('Day 13 — Sample', () => {
  const sample = $.sample(
    `
    [1,1,3,1,1]
    [1,1,5,1,1]

    [[1],[2,3,4]]
    [[1],4]

    [9]
    [[8,7,6]]

    [[4,4],4,4]
    [[4,4],4,4,4]

    [7,7,7,7]
    [7,7,7]

    []
    [3]

    [[[]]]
    [[]]

    [1,[2,[3,[4,[5,6,7]]]],8,9]
    [1,[2,[3,[4,[5,6,0]]]],8,9]
    `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), true)
  assert.strictEqual(compare([[1], [2, 3, 4]], [[1], 4]), true)
  assert.strictEqual(compare([9], [[8, 7, 6]]), false)
  assert.strictEqual(compare([[4, 4], 4, 4], [[4, 4], 4, 4, 4]), true)
  assert.strictEqual(compare([7, 7, 7, 7], [7, 7, 7]), false)
  assert.strictEqual(compare([], [3]), true)
  assert.strictEqual(compare([[[]]], [[]]), false)
  assert.strictEqual(
    compare(
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
    ),
    false
  )
  assert.strictEqual(getScore(sample), 13)
  assert.strictEqual(sort(sample), 140)
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(getScore(input), 5252)
  assert.strictEqual(sort(input), 20_592)
})
