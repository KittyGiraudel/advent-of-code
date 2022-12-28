const test = require('ava')
const $ = require('../../helpers')
const { processLine, getCorruptionScore, getCompletionScore } = require('./')

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
  const input = $.readInput(__dirname)

  t.is(getCorruptionScore(input), 243939)
  t.is(getCompletionScore(input), 2421222841)
})
