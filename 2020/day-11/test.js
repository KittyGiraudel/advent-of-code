const test = require('ava')
const $ = require('../../helpers')
const {
  processLayout,
  processSeatLoose,
  processSeatStrict,
  getVisibleSeats,
  waitAndCountOccupiedSeats,
} = require('./')

test('Day 11 — Sample', t => {
  const GEN_1 = $.sample(`
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
  `)

  const GEN_2 = $.sample(`
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
  `)

  const GEN_3 = $.sample(`
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
  `)

  const GEN_4 = $.sample(`
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
  `)

  const GEN_5 = $.sample(`
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
  `)

  const GEN_6 = $.sample(`
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
  `)

  t.deepEqual(processLayout(GEN_1, processSeatLoose), GEN_2)
  t.deepEqual(processLayout(GEN_2, processSeatLoose), GEN_3)
  t.deepEqual(processLayout(GEN_3, processSeatLoose), GEN_4)
  t.deepEqual(processLayout(GEN_4, processSeatLoose), GEN_5)
  t.deepEqual(processLayout(GEN_5, processSeatLoose), GEN_6)
  t.is(waitAndCountOccupiedSeats(GEN_1, processSeatLoose), 37)
  t.is(
    getVisibleSeats(
      $.sample(`
      .............
      .L.L.#.#.#.#.
      .............
      `),
      [1, 1]
    ).filter(s => s === 'L').length,
    1
  )
  t.is(
    getVisibleSeats(
      $.sample(`
      .......#.
      ...#.....
      .#.......
      .........
      ..#L....#
      ....#....
      .........
      #........
      ...#.....
      `),
      [3, 4]
    ).filter(s => s === '#').length,
    8
  )
  t.is(
    getVisibleSeats(
      $.sample(`
      .##.##.
      #.#.#.#
      ##...##
      ...L...
      ##...##
      #.#.#.#
      .##.##.
      `),
      [3, 3]
    ).filter(s => s === '#').length,
    0
  )
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(waitAndCountOccupiedSeats(input, processSeatLoose), 2261)
  t.is(waitAndCountOccupiedSeats(input, processSeatStrict), 2039)
})
