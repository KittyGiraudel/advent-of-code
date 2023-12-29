import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', t => {
  const sample = `16,1,2,0,4,2,7,1,2,14`.split(',').map(Number)

  t.is(run(sample), 37)
  t.is(run(sample, true), 168)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: ',' }).map(Number)

  t.is(run(input), 344_138)
  t.is(run(input, true), 94_862_124)
})
