import test from 'ava'
import $ from '../../helpers'
import { battleA, battleB } from './'

test('Day 02 — Sample', t => {
  const sample = $.sample(`
  A Y
  B X
  C Z
  `)

  t.is(battleA(sample), 15)
  t.is(battleB(sample), 12)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(battleA(input), 13_682)
  t.is(battleB(input), 12_881)
})
