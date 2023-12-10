import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 10 — Sample', t => {
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

  t.is(run(sample), 4)
  t.is(run(sample2), 8)
  t.is(run(sample3, true), 4)
  t.is(run(sample5, true), 10)
  t.is(run(sample4, true), 4)
})

test('Day 10 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 6947)
  t.is(run(input, true), 273)
})
