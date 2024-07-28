import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { foldAll, foldOnce, parseInput, render } from './'

test('Day 13 — Sample', () => {
  const sample = $.sample(
    `
  6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0

  fold along y=7
  fold along x=5
  `,
    { delimiter: '\n\n' }
  )

  const data = parseInput(sample)
  const dotsAfterFirstFold = foldOnce(data.dots, data.folds[0])
  const dotsAfterSecondFold = foldOnce(dotsAfterFirstFold, data.folds[1])
  assert.strictEqual(dotsAfterFirstFold.size, 17)
  assert.strictEqual(dotsAfterSecondFold.size, 16)
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  const data = parseInput(input)
  const dotsAfterFirstFold = foldOnce(data.dots, data.folds[0])

  assert.strictEqual(dotsAfterFirstFold.size, 807)
  assert.strictEqual(
    '\n' + render(foldAll(input)),
    `
#           # #     #     #   # # # #     # #     #     #   # # # #       # #
#         #     #   #     #   #         #     #   #     #   #               #
#         #         # # # #   # # #     #         #     #   # # #           #
#         #   # #   #     #   #         #   # #   #     #   #               #
#         #     #   #     #   #         #     #   #     #   #         #     #
# # # #     # # #   #     #   # # # #     # # #     # #     # # # #     # #  `
  )
})
