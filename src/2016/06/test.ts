import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', () => {
  const sample = $.sample(`
  eedadn
  drvtee
  eandsr
  raavrd
  atevrs
  tsrnev
  sdttsa
  rasrtv
  nssdts
  ntnada
  svetve
  tesnvt
  vntsnd
  vrdear
  dvrsen
  enarar
  `)

  assert.strictEqual(run(sample), 'advent')
  assert.strictEqual(run(sample, true), 'easter')
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 'myregdnr')
  assert.strictEqual(run(input, true), 'tzstqsua')
})
