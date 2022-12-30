import test from 'ava'
import $ from '../../helpers'
import { run, run2 } from './'

test('Day 09 — Sample', t => {
  t.is(run('ADVENT'), 6)
  t.is(run('A(1x5)BC'), 7)
  t.is(run('(3x3)XYZ'), 9)
  t.is(run('A(2x2)BCD(2x2)EFG'), 11)
  t.is(run('(6x1)(1x3)A'), 6)
  t.is(run('X(8x2)(3x3)ABCY'), 18)
  t.is(run2('(3x3)XYZ'), 9)
  t.is(run2('X(8x2)(3x3)ABCY'), 20)
  t.is(run2('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241920)
  t.is(run2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'), 445)
})

test('Day 09 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(run(input), 150914)
  t.is(run2(input), 11052855125)
})
