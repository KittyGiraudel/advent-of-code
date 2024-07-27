import test from 'ava'
import $ from '../../helpers'
import { getData, run } from './'

test('Day 22 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 960)
  t.is(getData(input), 225)
})
