const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`.split('\n')

test('Day 19 — Sample', t => {
  t.is(run(sample), 6)
})

test('Day 19 — Solutions', t => {
  t.is(run(input, 0), 1536)
  //t.is(run(input, 1), 1536)
})
