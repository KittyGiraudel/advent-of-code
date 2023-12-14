import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 08 — Sample', t => {
  const sample = $.sample(
    `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `
  )
  const sample2 = $.sample(
    `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)
    `
  )

  t.is(run(sample), 6)
  t.is(run(sample2, true), 6)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 12_169)
  t.is(run(input, true), 12_030_780_859_469)
})
