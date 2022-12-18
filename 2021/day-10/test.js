const test = require('ava')
const { processLine, getCorruptionScore, getCompletionScore } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split('\n')

test('Day 10 — Sample', t => {
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
  t.is(getCorruptionScore(input), 243939)
  t.is(getCompletionScore(input), 2421222841)
})
