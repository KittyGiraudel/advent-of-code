import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', t => {
  t.is(run('ne,ne,ne'.split(',')), 3)
  t.is(run('ne,ne,sw,sw'.split(',')), 0)
  t.is(run('ne,ne,s,s'.split(',')), 2)
  t.is(run('se,sw,se,sw,sw'.split(',')), 3)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: ',' })

  t.is(run(input), 650)
  t.is(run(input, true), 1465)
})
