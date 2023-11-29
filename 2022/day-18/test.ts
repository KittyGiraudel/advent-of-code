import test from 'ava'
import $ from '../../helpers'
import { Point } from '../../types'
import { getSurfaceArea } from './'

test('Day 18 — Sample', t => {
  const sample = $.sample(`
  2,2,2
  1,2,2
  3,2,2
  2,1,2
  2,3,2
  2,2,1
  2,2,3
  2,2,4
  2,2,6
  1,2,5
  3,2,5
  2,1,5
  2,3,5
  `) as Array<Point>

  t.is(getSurfaceArea(sample), 64)
  t.is(getSurfaceArea(sample, true), 58)
})

test('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta) as Array<Point>

  t.is(getSurfaceArea(input), 3412)
  t.is(getSurfaceArea(input, true), 2018)
})
