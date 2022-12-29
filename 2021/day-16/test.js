import test from 'ava'
import $ from '../../helpers'
import { evaluate, getVersionSums, Decoder } from './'

test('Day 16 — Sample', t => {
  t.is(getVersionSums('8A004A801A8002F478'), 16)
  t.is(getVersionSums('620080001611562C8802118E34'), 12)
  t.is(getVersionSums('C0015000016115A2E0802F182340'), 23)
  t.is(getVersionSums('A0016C880162017C3686B18A3D4780'), 31)
  t.is(evaluate('C200B40A82'), 3)
  t.is(evaluate('04005AC33890'), 54)
  t.is(evaluate('880086C3E88112'), 7)
  t.is(evaluate('CE00C43D881120'), 9)
  t.is(evaluate('D8005AC2A8F0'), 1)
  t.is(evaluate('F600BC2D8F'), 0)
  t.is(evaluate('9C005AC2F8F0'), 0)
  t.is(evaluate('9C0141080250320F1802104A08'), 1)
})

test('Day 16 — Solutions', t => {
  const [input] = $.readInput(import.meta)
  const { packet } = new Decoder(input)
  t.is(packet.sumVersions(), 889)
  t.is(packet.getValue(), 739303923668)
  t.is(getVersionSums(input), 889)
  t.is(evaluate(input), 739303923668)
})
