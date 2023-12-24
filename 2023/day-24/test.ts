import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 24 — Sample', t => {
  const sample = $.sample(
    `
    19, 13, 30 @ -2,  1, -2
    18, 19, 22 @ -1, -1, -2
    20, 25, 34 @ -2, -2, -4
    12, 31, 28 @ -1, -2, -1
    20, 19, 15 @  1, -5, -3
    `
  )
  t.is(run(sample), 2)
})

test.only('Day 24 — Solutions', async t => {
  const input = $.readInput(import.meta)
  t.is(await run(input), 15107)
  //t.is(await run(input, true), 856642398547748)
})
