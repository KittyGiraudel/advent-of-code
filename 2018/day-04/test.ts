import test from 'ava'
import $ from '../../helpers'
import { find } from './'

test('Day 04 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.deepEqual(find(input), [4716, 117061])
})
