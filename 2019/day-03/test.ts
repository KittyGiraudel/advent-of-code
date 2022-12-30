import test from 'ava'
import $ from '../../helpers'
import { findFastestIntersection, findClosestIntersection } from './'

test('Day 03 — Sample', t => {
  const sampleA: [string, string] = ['R8,U5,L5,D3', 'U7,R6,D4,L4']
  const sampleB: [string, string] = [
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83',
  ]
  const sampleC: [string, string] = [
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ]

  t.is(findClosestIntersection(sampleA), 6)
  t.is(findClosestIntersection(sampleB), 159)
  t.is(findClosestIntersection(sampleC), 135)
  t.is(findFastestIntersection(sampleA), 30)
  t.is(findFastestIntersection(sampleB), 610)
  t.is(findFastestIntersection(sampleC), 410)
})

test('Day 03 — Solutions', t => {
  const lines = $.readInput(import.meta) as [string, string]

  t.is(findClosestIntersection(lines), 806)
  t.is(findFastestIntersection(lines), 66076)
})
