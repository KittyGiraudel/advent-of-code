const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test.skip('Day 18 — Sample', t => {
  const sampleA = $.sample(`
  set a 1
  add a 2
  mul a a
  mod a 5
  snd a
  set a 0
  rcv a
  jgz a -1
  set a 1
  jgz a -2
  `)

  const sampleB = $.sample(`
  snd 1
  snd 2
  snd p
  rcv a
  rcv b
  rcv c
  rcv d
  `)

  t.is(run(sampleA), 4)
  t.is(run(sampleB), 3)
})

test('Day 18 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 5969)
})
