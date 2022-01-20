const test = require('ava')
const { observe } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `0,0,0,0
3,0,0,0
0,3,0,0
0,0,3,0
0,0,0,3
0,0,0,6
9,0,0,0
12,0,0,0`.split('\n')

const sampleB = `-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`.split('\n')

const sampleC = `1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2`.split('\n')

const sampleD = `1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`.split('\n')

test('Day 25.1', t => {
  t.is(observe(sampleA), 2)
  t.is(observe(sampleB), 4)
  t.is(observe(sampleC), 3)
  t.is(observe(sampleD), 8)
})

test.skip('Day 25.2', t => {})

test('Day 25 — Solutions', t => {
  t.is(observe(input), 375)
})
