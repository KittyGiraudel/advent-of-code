const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n', false)

const sampleA = `/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `.split('\n')

const sampleB = `/>-<\\
|   |
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`.split('\n')

test('Day 13 — Sample', t => {
  t.is(run(sampleA).join(','), '7,3')
  t.is(run(sampleB, true).join(','), '6,4')
})

test('Day 13 — Solutions', t => {
  t.is(run(input, false).join(','), '8,9')
  t.is(run(input, true).join(','), '73,33')
})
