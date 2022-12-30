import test from 'ava'
import $ from '../../helpers'
import { findStrongestBot } from './'

test('Day 23 — Sample', t => {
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

  t.is(findStrongestBot(sampleA)[0], 7)
  t.is(findStrongestBot(sampleB)[1], 36)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(findStrongestBot(input)[0], 602)
  t.is(findStrongestBot(input)[1], 110620102)
})
