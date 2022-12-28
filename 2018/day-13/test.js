const test = require('ava')
const { run } = require('./')
const $ = require('../../helpers')

test('Day 13 — Sample', t => {
  const sampleA = $.sample(
    `
/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/
  `,
    '\n',
    false,
    false
  ).filter(Boolean)

  const sampleB = $.sample(
    `
/>-<\\
|   |
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/
  `,
    '\n',
    false,
    false
  ).filter(Boolean)

  t.is(run(sampleA).join(','), '7,3')
  t.is(run(sampleB, true).join(','), '6,4')
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(__dirname, '\n', false)

  t.is(run(input, false).join(','), '8,9')
  t.is(run(input, true).join(','), '73,33')
})
