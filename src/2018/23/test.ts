import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findStrongestBot } from './'

test('Day 23 — Sample', () => {
  const sampleA = $.sample(`
  pos=<0,0,0>, r=4
  pos=<1,0,0>, r=1
  pos=<4,0,0>, r=3
  pos=<0,2,0>, r=1
  pos=<0,5,0>, r=3
  pos=<0,0,3>, r=1
  pos=<1,1,1>, r=1
  pos=<1,1,2>, r=1
  pos=<1,3,1>, r=1
  `)

  const sampleB = $.sample(`
  pos=<10,12,12>, r=2
  pos=<12,14,12>, r=2
  pos=<16,12,12>, r=4
  pos=<14,14,14>, r=6
  pos=<50,50,50>, r=200
  pos=<10,10,10>, r=5
  `)

  assert.strictEqual(findStrongestBot(sampleA)[0], 7)
  assert.strictEqual(findStrongestBot(sampleB)[1], 36)
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(findStrongestBot(input)[0], 602)
  assert.strictEqual(findStrongestBot(input)[1], 110_620_102)
})
