import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sampleA = $.sample(`
  abba[mnop]qrst
  abcd[bddb]xyyx
  aaaa[qwer]tyui
  ioxxoj[asdfgh]zxcvbn
  `)

  const sampleB = $.sample(`
  aba[bab]xyz
  xyx[xyx]xyx
  aaa[kek]eke
  zazbz[bzb]cdb
  `)

  assert.strictEqual(run(sampleA, 'TLS'), 2)
  assert.strictEqual(run(sampleB, 'SSL'), 3)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 'TLS'), 118)
  assert.strictEqual(run(input, 'SSL'), 260)
})
