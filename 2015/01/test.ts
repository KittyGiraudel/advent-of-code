import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.deepEqual(run(input), [232, 1783])
})
