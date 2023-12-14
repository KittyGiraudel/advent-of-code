import test from 'ava'
import $ from '../../helpers'
import { play, serializeChain, getChainValue } from '.'

test('Day 23 — Sample', t => {
  const sample = '389125467'.split('').map(Number)

  t.is(serializeChain(play(sample, 10)), 92_658_374)
  t.is(serializeChain(play(sample, 100)), 67_384_529)
  t.is(getChainValue(play(sample, 10_000_000, 1_000_000)), 149_245_887_792)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(serializeChain(play(input, 100)), 69_425_837)
  t.is(getChainValue(play(input, 10_000_000, 1_000_000)), 218_882_971_435)
})
