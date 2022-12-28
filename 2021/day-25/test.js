const test = require('ava')
const $ = require('../../helpers')
const { run, steps, serialize } = require('./')

test('Day 25 — Sample', t => {
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

  t.is(
    serialize(steps(sampleA, 4)),
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
  t.is(
    serialize(steps(sampleB, 5)),
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

  t.is(
    serialize(steps(sampleB, 10)),
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

  t.is(
    serialize(steps(sampleB, 58)),
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

  t.is(run(sampleB), 58)
})

test('Day 25 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 417)
})
