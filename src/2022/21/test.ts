import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getHumnNumber, getHumnNumberByBruteForce, getRootNumber } from './'

test('Day 21 — Sample', () => {
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

  assert.strictEqual(getRootNumber(sample), 152)
  assert.strictEqual(getHumnNumber(sample), 301)
  assert.strictEqual(getHumnNumberByBruteForce(sample), 301)
})

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(getRootNumber(input), 82_225_382_988_628)
  assert.strictEqual(getHumnNumber(input), 3_429_411_069_028)
})
