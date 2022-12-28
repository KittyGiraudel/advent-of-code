const test = require('ava')
const $ = require('../../helpers')
const { shuffle } = require('./')

test('Day 22 — Sample', t => {
  const sampleA = $.sample(`
  deal with increment 7
  deal into new stack
  deal into new stack
  `)

  const sampleB = $.sample(`
  cut 6
  deal with increment 7
  deal into new stack
  `)

  const sampleC = $.sample(`
  deal with increment 7
  deal with increment 9
  cut -2
  `)

  const sampleD = $.sample(`
  deal into new stack
  cut -2
  deal with increment 7
  cut 8
  cut -4
  deal with increment 7
  cut 3
  deal with increment 9
  deal with increment 3
  cut -1
  `)

  t.is(shuffle(sampleA, 10).join(' '), '0 3 6 9 2 5 8 1 4 7')
  t.is(shuffle(sampleB, 10).join(' '), '3 0 7 4 1 8 5 2 9 6')
  t.is(shuffle(sampleC, 10).join(' '), '6 3 0 7 4 1 8 5 2 9')
  t.is(shuffle(sampleD, 10).join(' '), '9 2 5 8 1 4 7 0 3 6')
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(
    shuffle(input).findIndex(c => c === 2019),
    6696
  )
})
