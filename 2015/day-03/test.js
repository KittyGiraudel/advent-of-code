import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', t => {
  t.is(run('^v^v^v^v^v'), 2)
  t.is(run('^v^v^v^v^v', true), 11)
})

test('Day 01 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(run(input), 2565)
  t.is(run(input, true), 2639)
})
