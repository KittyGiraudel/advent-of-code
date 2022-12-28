const test = require('ava')
const $ = require('../../helpers')
const { run, resolve } = require('./')

test('Day 24 — Sample', t => {
  const sampleA = $.sample(`
  inp x
  mul x -1
  `)

  const sampleB = $.sample(`
  inp z
  inp x
  mul z 3
  eql z x
  `)

  t.is(run(sampleA, [7]).x, -7)
  t.is(run(sampleB, [3, 8]).z, 0)
  t.is(run(sampleB, [3, 9]).z, 1)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(resolve(input, true), 53999995829399)
  t.is(resolve(input, false), 11721151118175)
})
