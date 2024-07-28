import assert from 'node:assert'
import test from 'node:test'
import { getFuelLoose, getFuelStrict } from './'

test('Day 11 — Sample', () => {
  assert.deepStrictEqual(getFuelStrict(18), { coords: [33, 45], value: 29 })
  assert.deepStrictEqual(getFuelStrict(42), { coords: [21, 61], value: 30 })
  assert.deepStrictEqual(getFuelLoose(18), {
    coords: [90, 269, 16],
    value: 113,
  })
})

test('Day 11 — Solutions', () => {
  assert.deepStrictEqual(getFuelStrict(8561), { coords: [21, 37], value: 30 })
  assert.deepStrictEqual(getFuelLoose(8561), {
    coords: [236, 146, 12],
    value: 160,
  })
})
