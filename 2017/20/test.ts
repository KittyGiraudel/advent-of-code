import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', t => {
  const sample = $.sample(`
  p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
  p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
  `)

  t.is(run(sample), 0)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 364)
  t.is(run(input, true), 420)
})
