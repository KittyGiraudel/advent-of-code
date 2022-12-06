const test = require('ava')
const { findMarker } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

test('Day 6.1', t => {
  t.is(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4), 7)
  t.is(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4), 5)
  t.is(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 4), 6)
  t.is(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4), 10)
  t.is(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4), 11)
})

test('Day 6.2', t => {
  t.is(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14), 19)
  t.is(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14), 23)
  t.is(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 14), 23)
  t.is(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14), 29)
  t.is(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14), 26)
})

test('Day 6 — Solutions', t => {
  t.is(findMarker(input, 4), 1804)
  t.is(findMarker(input, 14), 2508)
})
