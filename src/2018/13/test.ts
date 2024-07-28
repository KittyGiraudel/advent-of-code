import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 13 — Sample', () => {
  const sampleA = $.sample(
    `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   
  `,
    { trim: false, deindent: false }
  ).filter(Boolean)

  const sampleB = $.sample(
    `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/
  `,
    { trim: false, deindent: false }
  ).filter(Boolean)

  assert.deepEqual(run(sampleA).join(','), '7,3')
  assert.deepEqual(run(sampleB, true).join(','), '6,4')
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta, { trim: false })

  assert.deepEqual(run(input, false).join(','), '8,9')
  assert.deepEqual(run(input, true).join(','), '73,33')
})
