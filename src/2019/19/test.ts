import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 19 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual($.countInString(run(input).flat().join(''), '1'), 169)
  // I ended up solving part 2 almost entirely by hand, by approximating the
  // right area, then trying a few number adjustments until finding the right
  // answer.
})
