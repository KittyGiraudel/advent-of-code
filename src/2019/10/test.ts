import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findBestSpot, vaporize } from './'

test('Day 10 — Sample', () => {
  const sampleA = $.sample(`
  .#..#
  .....
  #####
  ....#
  ...##
  `)

  const sampleB = $.sample(`
  ......#.#.
  #..#.#....
  ..#######.
  .#.#.###..
  .#..#.....
  ..#....#.#
  #..#....#.
  .##.#..###
  ##...#..#.
  .#....####
  `)

  const sampleC = $.sample(`
  #.#...#.#.
  .###....#.
  .#....#...
  ##.#.#.#.#
  ....#.#.#.
  .##..###.#
  ..#...##..
  ..##....##
  ......#...
  .####.###.
  `)

  const sampleD = $.sample(`
  .#..#..###
  ####.###.#
  ....###.#.
  ..###.##.#
  ##.##.#.#.
  ....###..#
  ..#.#..#.#
  #..#.#.###
  .##...##.#
  .....#.#..
  `)

  const sampleE = $.sample(`
  .#..##.###...#######
  ##.############..##.
  .#.######.########.#
  .###.#######.####.#.
  #####.##.#.##.###.##
  ..#####..#.#########
  ####################
  #.####....###.#.#.##
  ##.#################
  #####.##.###..####..
  ..######..##.#######
  ####.##.####...##..#
  .#####..#.######.###
  ##...#.##########...
  #.##########.#######
  .####.#.###.###.#.##
  ....##.##.###..#####
  .#.#.###########.###
  #.#.#.#####.####.###
  ###.##.####.##.#..##
  `)

  const sampleF = $.sample(`
  .#....#####...#..
  ##...##.#####..##
  ##...#...#.#####.
  ..#.....#...###..
  ..#.#.....#....##
  `)

  assert.strictEqual(findBestSpot(sampleA)[0], '3,4')
  assert.strictEqual(findBestSpot(sampleB)[0], '5,8')
  assert.strictEqual(findBestSpot(sampleC)[0], '1,2')
  assert.strictEqual(findBestSpot(sampleD)[0], '6,3')
  assert.strictEqual(findBestSpot(sampleE)[0], '11,13')

  const orderE = vaporize(sampleE)
  assert.strictEqual(orderE[0][0] + ',' + orderE[0][1], '11,12')
  assert.strictEqual(orderE[1][0] + ',' + orderE[1][1], '12,1')
  assert.strictEqual(orderE[2][0] + ',' + orderE[2][1], '12,2')

  const orderF = vaporize(sampleF)
  assert.strictEqual(
    orderF.map(o => o[0] + ',' + o[1]).join(';'),
    '8,1;9,0;9,1;10,0;9,2;11,1;12,1;11,2;15,1;12,2;13,2;14,2;15,2;12,3;16,4;15,4;10,4;4,4;2,4;2,3;0,2;1,2;0,1;1,1;5,2;1,0;5,1;6,1;6,0;7,0;8,0;10,1;14,0;16,1;13,3;14,3'
  )
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)
  const order = vaporize(input)

  assert.strictEqual(findBestSpot(input)[1], 288)
  assert.strictEqual(order[199][0] * 100 + order[199][1], 616)
})
