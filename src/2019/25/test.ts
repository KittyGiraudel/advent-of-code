import test from 'ava'
import $ from '../../helpers'
import { inspect } from './'

test('Day 25 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(inspect(input), 84_410_376)
})
