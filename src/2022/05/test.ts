import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { process } from './'

test('Day 05 — Sample', () => {
  const sample = $.sample(
    `    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
    { delimiter: '\n\n', trim: false, deindent: false }
  ) as [string, string]

  assert.strictEqual(process(sample), 'CMZ')
  assert.strictEqual(process(sample, true), 'MCD')
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta, {
    delimiter: '\n\n',
    trim: false,
  }) as [string, string]

  assert.strictEqual(process(input), 'DHBJQJCCW')
  assert.strictEqual(process(input, true), 'WJVRLSJJT')
})
