import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', t => {
  t.is(run('ne,ne,ne'.split(','))[0], 3)
  t.is(run('ne,ne,sw,sw'.split(','))[0], 0)
  t.is(run('ne,ne,s,s'.split(','))[0], 2)
  t.is(run('se,sw,se,sw,sw'.split(','))[0], 3)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(import.meta, ',')

  t.deepEqual(run(input), [650, 1465])
})
