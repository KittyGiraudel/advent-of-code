const test = require('ava')
const $ = require('../../helpers')
const {
  parseProgram,
  executeProgram,
  processLoose,
  processStrict,
} = require('.')

test('Day 14 — Sample', t => {
  const example = $.sample(`
  mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
  mem[8] = 11
  mem[7] = 101
  mem[8] = 0
  `)
  t.deepEqual(parseProgram(example), [
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    [8, 11],
    [7, 101],
    [8, 0],
  ])
  t.is(executeProgram(example, processLoose), 165)
  const example2 = $.sample(`
  mask = 000000000000000000000000000000X1001X
  mem[42] = 100
  mask = 00000000000000000000000000000000X0XX
  mem[26] = 1
  `)
  t.is(executeProgram(example2, processStrict), 208)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(executeProgram(input, processLoose), 15172047086292)
  t.is(executeProgram(input, processStrict), 4197941339968)
})
