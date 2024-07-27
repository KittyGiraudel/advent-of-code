import test from 'ava'
import $ from '../../helpers'
import { processLine, run } from './'

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
  t.is(run(sample), 26_397)
  t.is(run(sample, true), 288_957)
})

test('Day 10 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 243_939)
  t.is(run(input, true), 2_421_222_841)
})
