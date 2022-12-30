import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 17 — Sample', t => {
  t.is(run([20, 15, 10, 5, 5], 25)[0], 4)
  t.is(run([20, 15, 10, 5, 5], 25)[1], 3)
})

test('Day 17 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.deepEqual(run(input, 150), [654, 57])
})
