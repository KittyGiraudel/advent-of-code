import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { Decoder, evaluate, getVersionSums } from './'

test('Day 16 — Sample', () => {
  assert.strictEqual(getVersionSums('8A004A801A8002F478'), 16)
  assert.strictEqual(getVersionSums('620080001611562C8802118E34'), 12)
  assert.strictEqual(getVersionSums('C0015000016115A2E0802F182340'), 23)
  assert.strictEqual(getVersionSums('A0016C880162017C3686B18A3D4780'), 31)
  assert.strictEqual(evaluate('C200B40A82'), 3)
  assert.strictEqual(evaluate('04005AC33890'), 54)
  assert.strictEqual(evaluate('880086C3E88112'), 7)
  assert.strictEqual(evaluate('CE00C43D881120'), 9)
  assert.strictEqual(evaluate('D8005AC2A8F0'), 1)
  assert.strictEqual(evaluate('F600BC2D8F'), 0)
  assert.strictEqual(evaluate('9C005AC2F8F0'), 0)
  assert.strictEqual(evaluate('9C0141080250320F1802104A08'), 1)
})

test('Day 16 — Solutions', () => {
  const [input] = $.readInput(import.meta)
  const { packet } = new Decoder(input)
  assert.strictEqual(packet.sumVersions(), 889)
  assert.strictEqual(packet.getValue(), 739_303_923_668)
  assert.strictEqual(getVersionSums(input), 889)
  assert.strictEqual(evaluate(input), 739_303_923_668)
})
