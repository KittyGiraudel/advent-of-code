import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', t => {
  const sample = $.sample(`
  ULL
  RRDDD
  LURDL
  UUUUD
  `)

  t.is(run(sample), '1985')
  t.is(run(sample, true), '5DB3')
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), '78985')
  t.is(run(input, true), '57DD8')
})
