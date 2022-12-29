import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 19 — Sample', t => {
  const sample = $.sample(
    `
      |
      |  +--+
      A  |  C
  F---|----E|--+
      |  |  |  D
      +B-+  +--+`,
    '\n',
    false,
    false
  ).slice(1)

  t.is(run(sample)[0], 'ABCDEF')
  t.is(run(sample)[1], 38)
})

test('Day 19 — Solutions', t => {
  const input = $.readInput(import.meta, '\n', false)

  t.deepEqual(run(input), ['VTWBPYAQFU', 17358])
})
