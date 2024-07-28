import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', () => {
  const sample = $.sample(
    `
    ???.### 1,1,3
    .??..??...?##. 1,1,3
    ?#?#?#?#?#?#?#? 1,3,1,6
    ????.#...#... 4,1,1
    ????.######..#####. 1,6,5
    ?###???????? 3,2,1
    `
  )

  assert.strictEqual(run(sample), 21)
  assert.strictEqual(run(sample, true), 525_152)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 7191)
  assert.strictEqual(run(input, true), 6_512_849_198_636)
})
