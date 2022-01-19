const test = require('ava')
const { findStrongestBot } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`.split('\n')

const sampleB = `pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`.split('\n')

test('Day 23.1', t => {
  t.is(findStrongestBot(sampleA)[0], 7)
})

test('Day 23.2', t => {
  t.is(findStrongestBot(sampleB)[1], 36)
})

test('Day 23 — Solutions', t => {
  t.is(findStrongestBot(input)[0], 602)
  t.is(findStrongestBot(input)[1], 110620102)
})
