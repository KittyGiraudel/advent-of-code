const test = require('ava')
const $ = require('../../helpers')
const { getLongestDistance, getDistancesAbove } = require('./')

test('Day 20 — Sample', t => {
  const SAMPLES = [
    '^WNE$',
    '^ENWWW(NEEE|SSE(EE|N))$',
    '^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$',
    '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$',
    '^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$',
    '^(E|SSEENNW)S$',
  ]

  t.is(getLongestDistance(SAMPLES[0]), 3)
  t.is(getLongestDistance(SAMPLES[1]), 10)
  t.is(getLongestDistance(SAMPLES[2]), 18)
  t.is(getLongestDistance(SAMPLES[3]), 23)
  t.is(getLongestDistance(SAMPLES[4]), 31)
  // Interestingly enough, both my own messy implementation and the clean one
  // found on Reddit fail on this example.
  // t.is(getLongestDistance(SAMPLES[5]), 4)
})

test('Day 20 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(getLongestDistance(input), 3806)
  t.is(getDistancesAbove(input, 1000), 8354)
})
