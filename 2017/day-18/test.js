const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`.split('\n')

const sampleB = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`.split('\n')

test.skip('Day 18 — Sample', t => {
  t.is(run(sampleA), 4)
  t.is(run(sampleB), 3)
})

test('Day 18 — Solutions', t => {
  // t.is(run(input), 1187)
  t.is(run(input), 5969)
})
