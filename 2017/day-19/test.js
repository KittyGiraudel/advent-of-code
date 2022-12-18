const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n', false)

const sampleA = `    |
    |  +--+
    A  |  C
F---|----E|--+
    |  |  |  D
    +B-+  +--+`.split('\n')

test('Day 19 — Sample', t => {
  t.is(run(sampleA)[0], 'ABCDEF')
  t.is(run(sampleA)[1], 38)
})

test('Day 19 — Solutions', t => {
  t.deepEqual(run(input), ['VTWBPYAQFU', 17358])
})
