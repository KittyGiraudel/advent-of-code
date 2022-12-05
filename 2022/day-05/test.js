const test = require('ava')
const { process } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n', false)

// prettier-ignore
const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`.split('\n\n')

test('Day 5.1', t => {
  t.is(process(sample), 'CMZ')
})

test('Day 5.2', t => {
  t.is(process(sample, true), 'MCD')
})

test('Day 5 — Solutions', t => {
  t.is(process(input), 'DHBJQJCCW')
  t.is(process(input, true), 'WJVRLSJJT')
})
