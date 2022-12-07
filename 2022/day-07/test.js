const test = require('ava')
const { parseOutput, getSmallDirsSize, findFreeableSpace } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `$ cd /
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
7214296 k`.split('\n')

const sampleDrive = parseOutput(sample)
const drive = parseOutput(input)

test('Day 7.1', t => {
  t.is(getSmallDirsSize(sampleDrive), 95437)
})

test('Day 7.2', t => {
  t.is(findFreeableSpace(sampleDrive), 24933642)
})

test('Day 7 — Solutions', t => {
  t.is(getSmallDirsSize(drive), 1513699)
  t.is(findFreeableSpace(drive), 7991939)
})
