import test from 'ava'
import $ from '../../helpers'
import { getPaperMeasurements, getRibbonMeasurements } from './'

test('Day 02 — Sample', t => {
  t.is(getPaperMeasurements(['2x3x4']), 58)
  t.is(getRibbonMeasurements(['2x3x4']), 34)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(getPaperMeasurements(input), 1_586_300)
  t.is(getRibbonMeasurements(input), 3_737_498)
})
