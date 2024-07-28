import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import type { QuadriPoint } from '../../types'
import { observe } from './'

test('Day 25 — Sample', () => {
  const sampleA = $.sample(`
  0,0,0,0
  3,0,0,0
  0,3,0,0
  0,0,3,0
  0,0,0,3
  0,0,0,6
  9,0,0,0
  12,0,0,0
  `)

  const sampleB = $.sample(`
  -1,2,2,0
  0,0,2,-2
  0,0,0,-2
  -1,2,0,0
  -2,-2,-2,2
  3,0,2,-1
  -1,3,2,2
  -1,0,-1,0
  0,2,1,-2
  3,0,0,0
  `)

  const sampleC = $.sample(`
  1,-1,0,1
  2,0,-1,0
  3,2,-1,0
  0,0,3,1
  0,0,-1,-1
  2,3,-2,0
  -2,2,0,0
  2,-2,0,-1
  1,-1,0,-1
  3,2,0,2
  `)

  const sampleD = $.sample(`
  1,-1,-1,-2
  -2,-2,0,1
  0,2,1,3
  -2,3,-2,1
  0,2,3,-2
  -1,-1,1,-2
  0,-2,-1,0
  -2,2,3,-1
  1,2,2,0
  -1,-2,0,-2
  `)

  assert.strictEqual(observe(sampleA as QuadriPoint[]), 2)
  assert.strictEqual(observe(sampleB as QuadriPoint[]), 4)
  assert.strictEqual(observe(sampleC as QuadriPoint[]), 3)
  assert.strictEqual(observe(sampleD as QuadriPoint[]), 8)
})

test('Day 25 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(observe(input as QuadriPoint[]), 375)
})
