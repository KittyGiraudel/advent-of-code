import test from 'ava'
import $ from '../../helpers'
import { compare, getScore, sort } from './'

test('Day 13 — Sample', t => {
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

  t.is(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), true)
  t.is(compare([[1], [2, 3, 4]], [[1], 4]), true)
  t.is(compare([9], [[8, 7, 6]]), false)
  t.is(compare([[4, 4], 4, 4], [[4, 4], 4, 4, 4]), true)
  t.is(compare([7, 7, 7, 7], [7, 7, 7]), false)
  t.is(compare([], [3]), true)
  t.is(compare([[[]]], [[]]), false)
  t.is(
    compare(
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
    ),
    false
  )
  t.is(getScore(sample), 13)
  t.is(sort(sample), 140)
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(getScore(input), 5252)
  t.is(sort(input), 20592)
})
