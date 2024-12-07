import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 04 — Sample', () => {
  const sample = $.sample(`
    MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX
  `)

  const sample2 = $.sample(`
    .M.S......
    ..A..MSMS.
    .M.S.MAA..
    ..A.ASMSM.
    .M.S.M....
    ..........
    S.S.S.S.S.
    .A.A.A.A..
    M.M.M.M.M.
    ..........
  `)

  assert.strictEqual(run(sample), 18)
  assert.strictEqual(run(sample2, true), 9)
})

test('Day 04 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 2534)
  assert.strictEqual(run(input, true), 1866)
})
