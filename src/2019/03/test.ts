import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findClosestIntersection, findFastestIntersection } from './'

test('Day 03 — Sample', () => {
  const sampleA: [string, string] = ['R8,U5,L5,D3', 'U7,R6,D4,L4']
  const sampleB: [string, string] = [
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83',
  ]
  const sampleC: [string, string] = [
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ]

  assert.strictEqual(findClosestIntersection(sampleA), 6)
  assert.strictEqual(findClosestIntersection(sampleB), 159)
  assert.strictEqual(findClosestIntersection(sampleC), 135)
  assert.strictEqual(findFastestIntersection(sampleA), 30)
  assert.strictEqual(findFastestIntersection(sampleB), 610)
  assert.strictEqual(findFastestIntersection(sampleC), 410)
})

test('Day 03 — Solutions', () => {
  const lines = $.readInput(import.meta) as [string, string]

  assert.strictEqual(findClosestIntersection(lines), 806)
  assert.strictEqual(findFastestIntersection(lines), 66_076)
})
