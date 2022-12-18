const test = require('ava')
const { parseInput, foldOnce, foldAll, render } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const sample = `6,10
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
fold along x=5`.split('\n\n')

test('Day 13 — Sample', t => {
  const data = parseInput(sample)
  const dotsAfterFirstFold = foldOnce(data.dots, data.folds[0])
  const dotsAfterSecondFold = foldOnce(dotsAfterFirstFold, data.folds[1])
  t.is(dotsAfterFirstFold.size, 17)
  t.is(dotsAfterSecondFold.size, 16)
})

test('Day 13 — Solutions', t => {
  const data = parseInput(input)
  const dotsAfterFirstFold = foldOnce(data.dots, data.folds[0])

  t.is(dotsAfterFirstFold.size, 807)
  t.is(
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
