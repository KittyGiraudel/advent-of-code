import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', t => {
  const sample = $.sample(`
  1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet
  `)

  const sample2 = $.sample(`
  two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen
  `)

  t.is(run(sample), 142)
  t.is(run(sample2, true), 281)
})

test('Day 01 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 54644)
  t.is(run(input, true), 53348)
})
