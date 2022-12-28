const test = require('ava')
const $ = require('../../helpers')
const { unsnafu, snafu } = require('./')

test('Day 25 — Sample', t => {
  const sample = $.sample(`
  1=-0-2
  12111
  2=0=
  21
  2=01
  111
  20012
  112
  1=-1=
  1-12
  12
  1=
  122
  `)

  const TESTS = {
    1: 1,
    2: 2,
    '1=': 3,
    '1-': 4,
    10: 5,
    11: 6,
    12: 7,
    '2=': 8,
    '2-': 9,
    20: 10,
    '1=0': 15,
    '1-0': 20,
    '1=11-2': 2022,
    '1-0---0': 12345,
    '1121-1110-1=0': 314159265,
    '1=-0-2': 1747,
    12111: 906,
    '2=0=': 198,
    21: 11,
    '2=01': 201,
    111: 31,
    20012: 1257,
    112: 32,
    '1=-1=': 353,
    '1-12': 107,
    12: 7,
    '1=': 3,
    122: 37,
  }

  for (let test in TESTS) {
    t.is(unsnafu(String(test)), TESTS[test])
  }

  for (let test in TESTS) {
    t.is(snafu(TESTS[test]), String(test))
  }

  t.is(
    sample.map(unsnafu).reduce((a, b) => a + b, 0),
    4890
  )

  t.is(snafu(sample.map(unsnafu).reduce((a, b) => a + b, 0)), '2=-1=0')
})

test('Day 25 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(
    snafu(input.map(unsnafu).reduce((a, b) => a + b, 0)),
    '2=--00--0220-0-21==1'
  )
})
