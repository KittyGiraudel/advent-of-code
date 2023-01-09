import test from 'ava'
import $ from '../../helpers'
import { cycle, findBiodiversity, findRecursiveBiodiversity } from './'

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
  t.is(findRecursiveBiodiversity(sampleA, 10), 99)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(findBiodiversity(input), 32573535)
  t.is(findRecursiveBiodiversity(input, 200), 1951)
})
