import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { cycle, findBiodiversity, findRecursiveBiodiversity } from './'

test('Day 24 — Sample', () => {
  const sampleA = $.sample(`
  ....#
  #..#.
  #..##
  ..#..
  #....
  `)

  assert.strictEqual(cycle(sampleA.join('')), '#..#.####.###.###.##.##..')
  assert.strictEqual(findBiodiversity(sampleA), 2_129_920)
  assert.strictEqual(findRecursiveBiodiversity(sampleA, 10), 99)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(findBiodiversity(input), 32_573_535)
  assert.strictEqual(findRecursiveBiodiversity(input, 200), 1951)
})
