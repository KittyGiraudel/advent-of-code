import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run, steps } from './'

test('Day 25 — Sample', () => {
  const sampleA = $.sample(`
  ...>...
  .......
  ......>
  v.....>
  ......>
  .......
  ..vvv..
  `)

  const sampleB = $.sample(`
  v...>>.vv>
  .vv>>.vv..
  >>.>v>...v
  >>v>>.>.v.
  v>v.vv.v..
  >.>>..v...
  .vv..>.>v.
  v.v..>>v.v
  ....v..v.>
  `)

  assert.strictEqual(
    steps(sampleA, 4).render(),
    $.sample(
      `
    >......
    ..v....
    ..>.v..
    .>.v...
    ...>...
    .......
    v......
    `
    ).join('\n')
  )
  assert.strictEqual(
    steps(sampleB, 5).render(),
    $.sample(
      `
    vv>...>v>.
    v.v.v>.>v.
    >.v.>.>.>v
    >v>.>..v>>
    ..v>v.v...
    ..>.>>vvv.
    .>...v>v..
    ..v.v>>v.v
    v.v.>...v.
    `
    ).join('\n')
  )

  assert.strictEqual(
    steps(sampleB, 10).render(),
    $.sample(
      `
    ..>..>>vv.
    v.....>>.v
    ..v.v>>>v>
    v>.>v.>>>.
    ..v>v.vv.v
    .v.>>>.v..
    v.v..>v>..
    ..v...>v.>
    .vv..v>vv.
    `
    ).join('\n')
  )

  assert.strictEqual(
    steps(sampleB, 58).render(),
    $.sample(
      `
    ..>>v>vv..
    ..v.>>vv..
    ..>>v>>vv.
    ..>>>>>vv.
    v......>vv
    v>v....>>v
    vvv.....>>
    >vv......>
    .>v.vv.v..
    `
    ).join('\n')
  )

  assert.strictEqual(run(sampleB), 58)
})

test('Day 25 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 417)
})
