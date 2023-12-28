import test from 'ava'
import $ from '../../helpers'
import { runProgram, runMonkeyPatchedProgram } from './'

test('Day 08 — Sample', t => {
  const buggyInput = $.sample(`
  nop +0
  acc +1
  jmp +4
  acc +3
  jmp -3
  acc -99
  acc +1
  jmp -4
  acc +6
  `)

  const fixedInput = $.sample(`
  nop +0
  acc +1
  jmp +4
  acc +3
  jmp -3
  acc -99
  acc +1
  nop -4
  acc +6
  `)

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
  const input = $.readInput(import.meta)

  const output = runProgram(input)
  t.is(output.accumulator, 1723)
  t.is(output.exit, 1)

  const fixedOutput = runMonkeyPatchedProgram(input)
  t.is(fixedOutput.accumulator, 846)
  t.is(fixedOutput.exit, 0)
})
