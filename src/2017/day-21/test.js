const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`.split('\n')

test('Day 21.1', t => {
  t.is(run(sampleA, 2), 12)
})

test.skip('Day 21.2', t => {})

test('Day 21 — Solutions', t => {
  t.is(run(input, 5), 197)
  t.is(run(input, 18), 3081737)
})
