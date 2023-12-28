import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 22 — Sample', t => {
  const sample = $.sample(
    `
    1,0,1~1,2,1
    0,0,2~2,0,2
    0,2,3~2,2,3
    0,0,4~0,2,4
    2,0,5~2,2,5
    0,1,6~2,1,6
    1,1,8~1,1,9
    `
  )
  t.is(run(sample), 5)
  t.is(run(sample, true), 7)
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 503)
  t.is(run(input, true), 98431)
})
