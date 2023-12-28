import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', t => {
  const sample = $.sample(
    `
    broadcaster -> a, b, c
    %a -> b
    %b -> c
    %c -> inv
    &inv -> a
    `
  )
  const sampleB = $.sample(
    `
    broadcaster -> a
    %a -> inv, con
    &inv -> b
    %b -> con
    &con -> output
    `
  )

  t.is(run(sample), 32_000_000)
  t.is(run(sampleB), 11_687_500)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 794_930_686)
  t.is(run(input, true), 244_465_191_362_269)
})
