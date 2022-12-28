const test = require('ava')
const $ = require('../../helpers')
const { cycle, findBiodiversity } = require('./')

test('Day 24 — Sample', t => {
  const sampleA = $.sample(`
  ....#
  #..#.
  #..##
  ..#..
  #....
  `)

  t.is(cycle(sampleA.join('')), '#..#.####.###.###.##.##..')
  t.is(findBiodiversity(sampleA), 2129920)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(findBiodiversity(input), 32573535)
})
