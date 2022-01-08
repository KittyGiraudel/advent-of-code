const test = require('ava')
const { cycle, findBiodiversity } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `
....#
#..#.
#..##
..#..
#....`
  .trim()
  .split('\n')

test('Day 24.1', t => {
  t.is(cycle(sampleA.join('')), '#..#.####.###.###.##.##..')
  t.is(findBiodiversity(sampleA), 2129920)
})

test.skip('Day 24.2', t => {})

test('Day 24 — Solutions', t => {
  t.is(findBiodiversity(input), 32573535)
})
