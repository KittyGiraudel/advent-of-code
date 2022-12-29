import test from 'ava'
import $ from '../../helpers'
import { debug } from './'

test('Day 16 — Solutions', t => {
  const input = $.readInput(import.meta, '\n\n')

  t.is(debug(input)[0], 627)
})
