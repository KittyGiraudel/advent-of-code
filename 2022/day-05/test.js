import test from 'ava'
import $ from '../../helpers'
import { process } from './'

test('Day 05 — Sample', t => {
  const sample = $.sample(
    `
    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
    '\n\n',
    false,
    false
  )

  t.is(process(sample), 'CMZ')
  t.is(process(sample, true), 'MCD')
})

test('Day 05 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n', trim: false })

  t.is(process(input), 'DHBJQJCCW')
  t.is(process(input, true), 'WJVRLSJJT')
})
