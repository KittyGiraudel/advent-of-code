import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findMarker } from './'

test('Day 06 — Sample', () => {
  assert.strictEqual(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4), 7)
  assert.strictEqual(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4), 5)
  assert.strictEqual(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 4), 6)
  assert.strictEqual(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4), 10)
  assert.strictEqual(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4), 11)
  assert.strictEqual(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14), 19)
  assert.strictEqual(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14), 23)
  assert.strictEqual(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 14), 23)
  assert.strictEqual(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14), 29)
  assert.strictEqual(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14), 26)
})

test('Day 06 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(findMarker(input, 4), 1804)
  assert.strictEqual(findMarker(input, 14), 2508)
})
