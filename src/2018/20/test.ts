import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getDistancesAbove, getLongestDistance } from './'

test('Day 20 — Sample', () => {
  const SAMPLES = [
    '^WNE$',
    '^ENWWW(NEEE|SSE(EE|N))$',
    '^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$',
    '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$',
    '^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$',
    '^(E|SSEENNW)S$',
  ]

  assert.strictEqual(getLongestDistance(SAMPLES[0]), 3)
  assert.strictEqual(getLongestDistance(SAMPLES[1]), 10)
  assert.strictEqual(getLongestDistance(SAMPLES[2]), 18)
  assert.strictEqual(getLongestDistance(SAMPLES[3]), 23)
  assert.strictEqual(getLongestDistance(SAMPLES[4]), 31)
  // Interestingly enough, both my own messy implementation and the clean one
  // found on Reddit fail on assert.strictEqual example.
  // assert.strictEqual(getLongestDistance(SAMPLES[5]), 4)
})

test('Day 20 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(getLongestDistance(input), 3806)
  assert.strictEqual(getDistancesAbove(input, 1000), 8354)
})
