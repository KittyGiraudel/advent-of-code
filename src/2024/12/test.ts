import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run, run2 } from './'

test('Day 11 — Sample', () => {
  const sample1 = $.sample(
    `
    AAAA
    BBCD
    BBCC
    EEEC
    `
  )
  const sample2 = $.sample(
    `
    OOOOO
    OXOXO
    OOOOO
    OXOXO
    OOOOO
    `
  )
  const sample3 = $.sample(
    `
    RRRRIICCFF
    RRRRIICCCF
    VVRRRCCFFF
    VVRCCCJFFF
    VVVVCJJCFE
    VVIVCCJJEE
    VVIIICJJEE
    MIIIIIJJEE
    MIIISIJEEE
    MMMISSJEEE
    `
  )
  const sample4 = $.sample(
    `
    EEEEE
    EXXXX
    EEEEE
    EXXXX
    EEEEE
    `
  )
  const sample5 = $.sample(
    `
    AAAAAA
    AAABBA
    AAABBA
    ABBAAA
    ABBAAA
    AAAAAA
    `
  )
  const sample6 = $.sample(
    `
    AAAAAAAA
    AACBBDDA
    AACBBAAA
    ABBAAAAA
    ABBADDDA
    AAAADADA
    AAAAAAAA
    `
  )

  assert.strictEqual(run(sample1), 140)
  assert.strictEqual(run(sample1, true), 80)
  assert.strictEqual(run(sample2), 772)
  assert.strictEqual(run(sample2, true), 436)
  assert.strictEqual(run(sample3), 1930)
  assert.strictEqual(run(sample4, true), 236)
  assert.strictEqual(run(sample5, true), 368)
  assert.strictEqual(run(sample6, true), 946)
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1489582)
  assert.strictEqual(run2(input), 914966)
})
