const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`.split('\n')

test('Day 04 — Sample', t => {
  t.is(run(sample)[0], 1514)
})

test('Day 04 — Solutions', t => {
  t.deepEqual(run(input), [409147, 991])
})
