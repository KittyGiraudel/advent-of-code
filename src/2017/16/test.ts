import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { dance } from './'

test('Day 16 — Sample', () => {
  assert.strictEqual(dance('s1,x3/4,pe/b'.split(','), 5), 'baedc')
})

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ',' })

  assert.strictEqual(dance(input), 'ehdpincaogkblmfj')
  assert.strictEqual(dance(input, 16, 1_000_000_000), 'bpcekomfgjdlinha')
})
