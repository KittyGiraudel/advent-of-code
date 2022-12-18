const test = require('ava')
const { runProgram, runMonkeyPatchedProgram } = require('./')
const instructions = require('../../helpers/readInput')(__dirname)

const buggyInput = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`
  .trim()
  .split('\n')

const fixedInput = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6
`
  .trim()
  .split('\n')

test('Day 08 — Sample', t => {
  const output = runProgram(buggyInput)
  t.is(output.accumulator, 5)
  t.is(output.exit, 1)

  const output2 = runProgram(fixedInput)
  t.is(output2.accumulator, 8)
  t.is(output2.exit, 0)

  const fixedOutput = runMonkeyPatchedProgram(buggyInput)
  t.is(fixedOutput.accumulator, 8)
  t.is(fixedOutput.exit, 0)

  t.deepEqual(output2, fixedOutput)
})

test('Day 08 — Solutions', t => {
  const output = runProgram(instructions)
  t.is(output.accumulator, 1723)
  t.is(output.exit, 1)

  const fixedOutput = runMonkeyPatchedProgram(instructions)
  t.is(fixedOutput.accumulator, 846)
  t.is(fixedOutput.exit, 0)
})
