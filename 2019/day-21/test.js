import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(run(input), 19351175)
})
