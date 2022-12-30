import test from 'ava'
import $ from '../../helpers'
import { processLine, getCorruptionScore, getCompletionScore } from './'

test('Day 10 — Sample', t => {
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

  t.is(processLine('(]').type, 'CORRUPTED')
  t.is(processLine('{()()()>').type, 'CORRUPTED')
  t.is(processLine('(((()))}').type, 'CORRUPTED')
  t.is(processLine('<([]){()}[{}])').type, 'CORRUPTED')
  t.is(processLine('{([(<{}[<>[]}>{[]{[(<()>').type, 'CORRUPTED')
  t.is(processLine('[[<[([]))<([[{}[[()]]]').type, 'CORRUPTED')
  t.is(processLine('[{[{({}]{}}([{[{{{}}([]').type, 'CORRUPTED')
  t.is(processLine('[<(<(<(<{}))><([]([]()').type, 'CORRUPTED')
  t.is(processLine('<{([([[(<>()){}]>(<<{{').type, 'CORRUPTED')
  t.is(getCorruptionScore(sample), 26397)
  t.is(getCompletionScore(sample), 288957)
})

test('Day 10 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(getCorruptionScore(input), 243939)
  t.is(getCompletionScore(input), 2421222841)
})