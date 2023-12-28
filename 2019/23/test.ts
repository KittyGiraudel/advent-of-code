import test from 'ava'
import $ from '../../helpers'
import { boot } from './'

test('Day 23 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(boot(input).pop(), 20_160)
  t.is(boot(input).shift(), 13_164)
})
