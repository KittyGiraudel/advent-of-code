const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 04 — Sample', t => {
  const sample = $.sample(`
  aaaaa-bbb-z-y-x-123[abxyz]
  a-b-c-d-e-f-g-h-987[abcde]
  not-a-real-room-404[oarel]
  totally-real-room-200[decoy]
  `)

  t.is(run(sample)[0], 1514)
})

test('Day 04 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.deepEqual(run(input), [409147, 991])
})
