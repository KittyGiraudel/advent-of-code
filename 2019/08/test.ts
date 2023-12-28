import test from 'ava'
import $ from '../../helpers'
import { validate, recompose } from './'

test('Day 08 — Sample', t => {
  const sample = '0222112222120000'

  t.deepEqual(recompose(sample, { width: 2, height: 2 }).rows, [
    [0, 1],
    [1, 0],
  ])
})

test('Day 08 — Solutions', t => {
  const [input] = $.readInput(import.meta)
  const dimensions = { width: 25, height: 6 }

  t.is(validate(input, dimensions), 2440)
})
