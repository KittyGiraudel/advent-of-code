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
    { trim: false, deindent: false }
  ).slice(1)

  t.is(run(sample)[0], 'ABCDEF')
  t.is(run(sample)[1], 38)
})

test('Day 19 — Solutions', t => {
  const input = $.readInput(import.meta, { trim: false })

  t.deepEqual(run(input), ['VTWBPYAQFU', 17_358])
})
