import test from 'ava'
import $ from '../../helpers'
import { parseOutput, getSmallDirsSize, findFreeableSpace } from './'

test('Day 07 — Sample', t => {
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

  t.is(getSmallDirsSize(sampleDrive), 95437)
  t.is(findFreeableSpace(sampleDrive), 24933642)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(import.meta)
  const drive = parseOutput(input)

  t.is(getSmallDirsSize(drive), 1513699)
  t.is(findFreeableSpace(drive), 7991939)
})
