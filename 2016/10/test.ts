import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 10 — Sample', t => {
  const sample = $.sample(`
  value 5 goes to bot 2
  bot 2 gives low to bot 1 and high to bot 0
  value 3 goes to bot 1
  bot 1 gives low to output 1 and high to bot 0
  bot 0 gives low to output 2 and high to output 0
  value 2 goes to bot 2
  `)

  t.is(run(sample), 30)
})

test('Day 10 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 143_153)
})
