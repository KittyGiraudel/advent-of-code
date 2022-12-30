import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 19 — Sample', t => {
  const sample = $.sample(`
  #ip 0
  seti 5 0 1
  seti 6 0 2
  addi 0 1 0
  addr 1 2 3
  setr 1 0 0
  seti 8 0 4
  seti 9 0 5
  `)

  t.is(run(sample), 6)
})

test('Day 19 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 0), 1536)
})
