import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 13 — Sample', t => {
  const sample = $.sample(`
  Alice would gain 54 happiness units by sitting next to Bob.
  Alice would lose 79 happiness units by sitting next to Carol.
  Alice would lose 2 happiness units by sitting next to David.
  Bob would gain 83 happiness units by sitting next to Alice.
  Bob would lose 7 happiness units by sitting next to Carol.
  Bob would lose 63 happiness units by sitting next to David.
  Carol would lose 62 happiness units by sitting next to Alice.
  Carol would gain 60 happiness units by sitting next to Bob.
  Carol would gain 55 happiness units by sitting next to David.
  David would gain 46 happiness units by sitting next to Alice.
  David would lose 7 happiness units by sitting next to Bob.
  David would gain 41 happiness units by sitting next to Carol.
  `)

  t.is(run(sample), 330)
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 618)
  t.is(run(input, true), 601)
})
