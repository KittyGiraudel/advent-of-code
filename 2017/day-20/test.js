const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`.split('\n')

test('Day 20 — Sample', t => {
  t.is(run(sampleA)[0], 0)
})

test('Day 20 — Solutions', t => {
  t.deepEqual(run(input), [364, 420])
})
