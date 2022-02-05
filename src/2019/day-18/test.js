const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `
#########
#b.A.@.a#
#########
`
  .trim()
  .split('\n')

const sampleB = `
########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################
`
  .trim()
  .split('\n')

test('Day 18.1', t => {
  t.is(run(sampleA), 8)
  //t.is(run(sampleB), 86)
})

test.skip('Day 18.2', t => {})

test.skip('Day 18 — Solutions', t => {})
