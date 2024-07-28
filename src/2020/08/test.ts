import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { runMonkeyPatchedProgram, runProgram } from './'

test('Day 08 — Sample', () => {
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
  assert.strictEqual(output.accumulator, 5)
  assert.strictEqual(output.exit, 1)

  const output2 = runProgram(fixedInput)
  assert.strictEqual(output2.accumulator, 8)
  assert.strictEqual(output2.exit, 0)

  const fixedOutput = runMonkeyPatchedProgram(buggyInput)
  assert.strictEqual(fixedOutput.accumulator, 8)
  assert.strictEqual(fixedOutput.exit, 0)

  assert.deepStrictEqual(output2, fixedOutput)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)

  const output = runProgram(input)
  assert.strictEqual(output.accumulator, 1723)
  assert.strictEqual(output.exit, 1)

  const fixedOutput = runMonkeyPatchedProgram(input)
  assert.strictEqual(fixedOutput.accumulator, 846)
  assert.strictEqual(fixedOutput.exit, 0)
})
