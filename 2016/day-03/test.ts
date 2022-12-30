import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.deepEqual(run(input), [862, 1577])
})
