import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import {
  getVisibleSeats,
  processLayout,
  processSeatLoose,
  processSeatStrict,
  waitAndCountOccupiedSeats,
} from './'

test('Day 11 — Sample', () => {
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

  assert.deepStrictEqual(
    processLayout($.Grid.fromRows(GEN_1), processSeatLoose).rows.map(row =>
      row.join('')
    ),
    GEN_2
  )
  assert.deepStrictEqual(
    processLayout($.Grid.fromRows(GEN_2), processSeatLoose).rows.map(row =>
      row.join('')
    ),
    GEN_3
  )
  assert.deepStrictEqual(
    processLayout($.Grid.fromRows(GEN_3), processSeatLoose).rows.map(row =>
      row.join('')
    ),
    GEN_4
  )
  assert.deepStrictEqual(
    processLayout($.Grid.fromRows(GEN_4), processSeatLoose).rows.map(row =>
      row.join('')
    ),
    GEN_5
  )
  assert.deepStrictEqual(
    processLayout($.Grid.fromRows(GEN_5), processSeatLoose).rows.map(row =>
      row.join('')
    ),
    GEN_6
  )
  assert.strictEqual(waitAndCountOccupiedSeats(GEN_1, processSeatLoose), 37)
  assert.strictEqual(
    getVisibleSeats(
      $.Grid.fromRows(
        $.sample(`
      .............
      .L.L.#.#.#.#.
      .............
      `)
      ),
      [1, 1]
    ).filter(s => s === 'L').length,
    1
  )
  assert.strictEqual(
    getVisibleSeats(
      $.Grid.fromRows(
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
      `)
      ),
      [4, 3]
    ).filter(s => s === '#').length,
    8
  )
  assert.strictEqual(
    getVisibleSeats(
      $.Grid.fromRows(
        $.sample(`
      .##.##.
      #.#.#.#
      ##...##
      ...L...
      ##...##
      #.#.#.#
      .##.##.
      `)
      ),
      [3, 3]
    ).filter(s => s === '#').length,
    0
  )
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(waitAndCountOccupiedSeats(input, processSeatLoose), 2261)
  assert.strictEqual(waitAndCountOccupiedSeats(input, processSeatStrict), 2039)
})
