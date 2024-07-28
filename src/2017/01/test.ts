import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { captcha } from './'

test('Day 01 — Sample', () => {
  assert.strictEqual(captcha('1122', 1), 3)
  assert.strictEqual(captcha('1111', 1), 4)
  assert.strictEqual(captcha('1234', 1), 0)
  assert.strictEqual(captcha('91212129', 1), 9)
  assert.strictEqual(captcha('1212'), 6)
  assert.strictEqual(captcha('1221'), 0)
  assert.strictEqual(captcha('123425'), 4)
  assert.strictEqual(captcha('123123'), 12)
  assert.strictEqual(captcha('12131415'), 4)
})

test('Day 01 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(captcha(input, 1), 1253)
  assert.strictEqual(captcha(input), 1278)
})
