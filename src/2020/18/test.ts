import test from 'ava'
import { computeLoose, computeStrict } from '.'
import $ from '../../helpers'

test('Day 18 — Sample', t => {
  t.is(computeLoose('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  t.is(computeLoose('2 * 3 + (4 * 5)'), 26)
  t.is(computeLoose('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 437)
  t.is(computeLoose('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'), 12_240)
  t.is(computeLoose('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'), 13_632)
  t.is(computeStrict('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  t.is(computeStrict('2 * 3 + (4 * 5)'), 46)
  t.is(computeStrict('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 1445)
  t.is(computeStrict('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'), 669_060)
  t.is(computeStrict('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'), 23_340)
})

test('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is($.sum(input.map(computeLoose)), 280_014_646_144)
  t.is($.sum(input.map(computeStrict)), 9_966_990_988_262)
})
