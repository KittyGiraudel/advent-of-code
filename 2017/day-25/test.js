const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const sampleA = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`.split('\n\n')

test('Day 25 — Sample', t => {
  t.is(run(sampleA), 3)
})

test('Day 25 — Solutions', t => {
  t.is(run(input), 2526)
})
