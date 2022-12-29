import test from 'ava'
import $ from '../../helpers'
import { calibrate, recompose } from './'

test('Day 19 — Sample', t => {
  const sampleA = $.sample(`
  H => HO
  H => OH
  O => HH

  HOH
  `)

  const sampleB = $.sample(`
  H => HO
  H => OH
  O => HH

  HOHOHO
  `)

  t.is(calibrate(sampleA), 4)
  t.is(calibrate(sampleB), 7)
})

test('Day 19 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(calibrate(input), 509)
  t.is(recompose(input), 195)
})
