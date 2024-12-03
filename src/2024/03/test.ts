import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', () => {
  const sample = $.sample(
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
  )
  const sample2 = $.sample(
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
  )

  assert.strictEqual(run(sample), 161)
  assert.strictEqual(run(sample2, true), 48)
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 181345830)
  assert.strictEqual(run(input, true), 98729041)
})
