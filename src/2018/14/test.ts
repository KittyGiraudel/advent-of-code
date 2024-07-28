import assert from 'node:assert'
import test from 'node:test'
import { cook1, cook2 } from './'

test('Day 14 — Sample', () => {
  assert.strictEqual(cook1(9), '5158916779')
  assert.strictEqual(cook1(5), '0124515891')
  assert.strictEqual(cook1(18), '9251071085')
  assert.strictEqual(cook1(2018), '5941429882')
  assert.strictEqual(cook2('51589'), 9)
  assert.strictEqual(cook2('01245'), 5)
  assert.strictEqual(cook2('92510'), 18)
  assert.strictEqual(cook2('59414'), 2018)
})

test('Day 14 — Solutions', () => {
  assert.strictEqual(cook1(260_321), '9276422810')
  assert.strictEqual(cook2('260321', 16_000_000), 20_319_117)
})
