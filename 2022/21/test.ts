import test from 'ava'
import $ from '../../helpers'
import { getHumnNumber, getHumnNumberByBruteForce, getRootNumber } from './'

test('Day 21 — Sample', t => {
  const sample = $.sample(`
  root: pppw + sjmn
  dbpl: 5
  cczh: sllz + lgvd
  zczc: 2
  ptdq: humn - dvpt
  dvpt: 3
  lfqf: 4
  humn: 5
  ljgn: 2
  sjmn: drzm * dbpl
  sllz: 4
  pppw: cczh / lfqf
  lgvd: ljgn * ptdq
  drzm: hmdt - zczc
  hmdt: 32
  `)

  t.is(getRootNumber(sample), 152)
  t.is(getHumnNumber(sample), 301)
  t.is(getHumnNumberByBruteForce(sample), 301)
})

test('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(getRootNumber(input), 82_225_382_988_628)
  t.is(getHumnNumber(input), 3_429_411_069_028)
})
