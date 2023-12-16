import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 16 — Sample', t => {
  const sample = $.sample(
    `
    .|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....
    `
  )

  t.is(run(sample), 46)
  t.is(run(sample, true), 51)
})

test('Day 16 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 8112)
  t.is(run(input, true), 8314)
})
