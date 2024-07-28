import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { processLine, run } from './'

test('Day 10 — Sample', () => {
  const sample = $.sample(`
  [({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]
  `)

  assert.strictEqual(processLine('(]').type, 'CORRUPTED')
  assert.strictEqual(processLine('{()()()>').type, 'CORRUPTED')
  assert.strictEqual(processLine('(((()))}').type, 'CORRUPTED')
  assert.strictEqual(processLine('<([]){()}[{}])').type, 'CORRUPTED')
  assert.strictEqual(processLine('{([(<{}[<>[]}>{[]{[(<()>').type, 'CORRUPTED')
  assert.strictEqual(processLine('[[<[([]))<([[{}[[()]]]').type, 'CORRUPTED')
  assert.strictEqual(processLine('[{[{({}]{}}([{[{{{}}([]').type, 'CORRUPTED')
  assert.strictEqual(processLine('[<(<(<(<{}))><([]([]()').type, 'CORRUPTED')
  assert.strictEqual(processLine('<{([([[(<>()){}]>(<<{{').type, 'CORRUPTED')
  assert.strictEqual(run(sample), 26_397)
  assert.strictEqual(run(sample, true), 288_957)
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 243_939)
  assert.strictEqual(run(input, true), 2_421_222_841)
})
