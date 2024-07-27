import test from 'ava'
import $ from '../../helpers'
import type { QuadriPoint } from '../../types'
import { observe } from './'

test('Day 25 — Sample', t => {
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

  t.is(observe(sampleA as QuadriPoint[]), 2)
  t.is(observe(sampleB as QuadriPoint[]), 4)
  t.is(observe(sampleC as QuadriPoint[]), 3)
  t.is(observe(sampleD as QuadriPoint[]), 8)
})

test('Day 25 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(observe(input as QuadriPoint[]), 375)
})
