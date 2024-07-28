import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findFreeableSpace, getSmallDirsSize, parseOutput } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(`
  $ cd /
  $ ls
  dir a
  14848514 b.txt
  8504156 c.dat
  dir d
  $ cd a
  $ ls
  dir e
  29116 f
  2557 g
  62596 h.lst
  $ cd e
  $ ls
  584 i
  $ cd ..
  $ cd ..
  $ cd d
  $ ls
  4060174 j
  8033020 d.log
  5626152 d.ext
  7214296 k
  `)
  const sampleDrive = parseOutput(sample)

  assert.strictEqual(getSmallDirsSize(sampleDrive), 95_437)
  assert.strictEqual(findFreeableSpace(sampleDrive), 24_933_642)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)
  const drive = parseOutput(input)

  assert.strictEqual(getSmallDirsSize(drive), 1_513_699)
  assert.strictEqual(findFreeableSpace(drive), 7_991_939)
})
