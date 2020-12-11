const test = require('ava')
const {
  processLayout,
  processSeatLoose,
  processSeatStrict,
  getVisibleSeats,
  waitAndCountOccupiedSeats,
} = require('./')
const input = require('../helpers/readInput')(__dirname)

const GEN_1 = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`
  .trim()
  .split('\n')

const GEN_2 = `
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
`
  .trim()
  .split('\n')

const GEN_3 = `
#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
`
  .trim()
  .split('\n')

const GEN_4 = `
#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
  `
  .trim()
  .split('\n')

const GEN_5 = `
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
`
  .trim()
  .split('\n')

const GEN_6 = `
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
`
  .trim()
  .split('\n')

test('Day 11.1', t => {
  t.deepEqual(processLayout(GEN_1, processSeatLoose), GEN_2)
  t.deepEqual(processLayout(GEN_2, processSeatLoose), GEN_3)
  t.deepEqual(processLayout(GEN_3, processSeatLoose), GEN_4)
  t.deepEqual(processLayout(GEN_4, processSeatLoose), GEN_5)
  t.deepEqual(processLayout(GEN_5, processSeatLoose), GEN_6)
  t.is(waitAndCountOccupiedSeats(GEN_1, processSeatLoose), 37)
})

test('Day 11.2', t => {
  t.is(
    getVisibleSeats(
      `
.............
.L.L.#.#.#.#.
.............`.split('\n'),
      [1, 1]
    ).filter(s => s === 'L').length,
    1
  )
  t.is(
    getVisibleSeats(
      `
.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`
        .trim()
        .split('\n'),
      [3, 4]
    ).filter(s => s === '#').length,
    8
  )
  t.is(
    getVisibleSeats(
      `
.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`
        .trim()
        .split('\n'),
      [3, 3]
    ).filter(s => s === '#').length,
    0
  )
})

test('Day 11 — Solutions', t => {
  t.is(waitAndCountOccupiedSeats(input, processSeatLoose), 2261)
  t.is(waitAndCountOccupiedSeats(input, processSeatStrict), 2039)
})
