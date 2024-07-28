import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 10 — Sample', () => {
  const sample = $.sample(
    `
    -L|F7
    7S-7|
    L|7||
    -L-J|
    L|-JF
    `
  )
  const sample2 = $.sample(
    `
    7-F7-
    .FJ|7
    SJLL7
    |F--J
    LJ.LJ
    `
  )

  const sample3 = $.sample(`
  ...........
  .S-------7.
  .|F-----7|.
  .||.....||.
  .||.....||.
  .|L-7.F-J|.
  .|..|.|..|.
  .L--J.L--J.
  ...........
  `)

  const sample4 = $.sample(`
  ..........
  .S------7.
  .|F----7|.
  .||....||.
  .||....||.
  .|L-7F-J|.
  .|..||..|.
  .L--JL--J.
  ..........
  `)

  const sample5 = $.sample(`
  ......................
  .FF7FSF7F7F7F7F7F---7.
  .L|LJ||||||||||||F--J.
  .FL-7LJLJ||||||LJL-77.
  .F--JF--7||LJLJ7F7FJ-.
  .L---JF-JLJ.||-FJLJJ7.
  .|F|F-JF---7F7-L7L|7|.
  .|FFJF7L7F-JF7|JL---7.
  .7-L-JL7||F7|L7F-7F7|.
  .L.L7LFJ|||||FJL7||LJ.
  .L7JLJL-JLJLJL--JLJ.L.
  ......................
  `)

  assert.strictEqual(run(sample), 4)
  assert.strictEqual(run(sample2), 8)
  assert.strictEqual(run(sample3, true), 4)
  assert.strictEqual(run(sample5, true), 10)
  assert.strictEqual(run(sample4, true), 4)
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 6947)
  assert.strictEqual(run(input, true), 273)
})
