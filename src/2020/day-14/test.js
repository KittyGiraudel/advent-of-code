const test = require('ava')
const {
  parseProgram,
  executeProgram,
  processLoose,
  processStrict,
} = require('.')
const input = require('../../helpers/readInput')(__dirname)

test('Day 14.1', t => {
  const example = `
  mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
  mem[8] = 11
  mem[7] = 101
  mem[8] = 0
  `
    .trim()
    .split('\n')
  t.deepEqual(parseProgram(example), [
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    [8, 11],
    [7, 101],
    [8, 0],
  ])
  t.is(executeProgram(example, processLoose), 165)
})

test('Day 14.2', t => {
  const example = `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
`
    .trim()
    .split('\n')
  t.is(executeProgram(example, processStrict), 208)
})

test('Day 14 — Solutions', t => {
  t.is(executeProgram(input, processLoose), 15172047086292)
  t.is(executeProgram(input, processStrict), 4197941339968)
})
