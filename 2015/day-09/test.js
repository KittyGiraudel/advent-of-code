import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', t => {
  const sample = $.sample(`
  London to Dublin = 464
  London to Belfast = 518
  Dublin to Belfast = 141
  `)

  t.is(Math.min(...run(sample)), 605)
  t.is(Math.max(...run(sample)), 982)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(Math.min(...run(input)), 207)
  t.is(Math.max(...run(input)), 804)
})
