const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 20 — Sample', t => {
  const sample = $.sample(`
  p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
  p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
  `)

  t.is(run(sample)[0], 0)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.deepEqual(run(input), [364, 420])
})
