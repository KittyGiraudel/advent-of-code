import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', t => {
  t.is(run(['ugknbfddgicrmopn']), 1)
  t.is(run(['aaa']), 1)
  t.is(run(['jchzalrnumimnmhp']), 0)
  t.is(run(['haegwjzuvuyypxyu']), 0)
  t.is(run(['dvszwmarrgswjxmb']), 0)
  t.is(run(['qjhvhtzxzqqjkmpb'], true), 1)
  t.is(run(['xxyxx'], true), 1)
  t.is(run(['uurcxstgmygtbstg'], true), 0)
  t.is(run(['ieodomkazucvgmuy'], true), 0)
})

test('Day 05 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 255)
  t.is(run(input, true), 55)
})
