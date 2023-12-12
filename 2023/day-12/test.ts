import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', t => {
  const sample = $.sample(
    `
    ???.### 1,1,3
    .??..??...?##. 1,1,3
    ?#?#?#?#?#?#?#? 1,3,1,6
    ????.#...#... 4,1,1
    ????.######..#####. 1,6,5
    ?###???????? 3,2,1
    `
  )

  t.is(run(sample), 21)
  t.is(run(sample, true), 525152)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 7191)
  t.is(run(input, true), 6512849198636)
})
