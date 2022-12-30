import test from 'ava'
import $ from '../../helpers'
import { count } from './'

test('Day 14 — Sample', t => {
  const sample = $.sample(
    `
  NNCB

  CH -> B
  HH -> N
  CB -> H
  NH -> C
  HB -> C
  HC -> B
  HN -> C
  NN -> C
  BH -> H
  NC -> B
  NB -> B
  BN -> B
  BB -> N
  BC -> B
  CC -> N
  CN -> C
  `,
    '\n\n'
  )

  t.is(count(sample, 10), 1588)
  t.is(count(sample, 40), 2188189693529)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(count(input, 10), 2321)
  t.is(count(input, 40), 2399822193707)
})
