import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run, run2 } from './'

test('Day 09 — Sample', () => {
  assert.strictEqual(run('ADVENT'), 6)
  assert.strictEqual(run('A(1x5)BC'), 7)
  assert.strictEqual(run('(3x3)XYZ'), 9)
  assert.strictEqual(run('A(2x2)BCD(2x2)EFG'), 11)
  assert.strictEqual(run('(6x1)(1x3)A'), 6)
  assert.strictEqual(run('X(8x2)(3x3)ABCY'), 18)
  assert.strictEqual(run2('(3x3)XYZ'), 9)
  assert.strictEqual(run2('X(8x2)(3x3)ABCY'), 20)
  assert.strictEqual(run2('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241_920)
  assert.strictEqual(
    run2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'),
    445
  )
})

test('Day 09 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 150_914)
  assert.strictEqual(run2(input), 11_052_855_125)
})
