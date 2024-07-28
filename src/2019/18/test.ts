import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', () => {
  const sampleA = $.sample(`
  #########
  #b.A.@.a#
  #########
  `)

  const sampleB = $.sample(`
  ########################
  #f.D.E.e.C.b.A.@.a.B.c.#
  ######################.#
  #d.....................#
  ########################
  `)
  const sampleC = $.sample(`
  ########################
  #...............b.C.D.f#
  #.######################
  #.....@.a.B.c.d.A.e.F.g#
  ########################
  `)
  const sampleD = $.sample(`
  #################
  #i.G..c...e..H.p#
  ########.########
  #j.A..b...f..D.o#
  ########@########
  #k.E..a...g..B.n#
  ########.########
  #l.F..d...h..C.m#
  #################
  `)
  const sampleE = $.sample(`
  ########################
  #@..............ac.GI.b#
  ###d#e#f################
  ###A#B#C################
  ###g#h#i################
  ########################
  `)
  const sampleF = $.sample(`
  #######
  #a.#Cd#
  ##...##
  ##.@.##
  ##...##
  #cB#Ab#
  #######
  `)
  const sampleG = $.sample(`
  #############
  #DcBa.#.GhKl#
  #.###   #I###
  #e#d# @ #j#k#
  ###C#   ###J#
  #fEbA.#.FgHi#
  #############
  `)
  const sampleH = $.sample(`
  #############
  #g#f.D#..h#l#
  #F###e#E###.#
  #dCba   BcIJ#
  ##### @ #####
  #nK.L   G...#
  #M###N#H###.#
  #o#m..#i#jk.#
  #############
  `)

  assert.strictEqual(run(sampleB), 86)
  assert.strictEqual(run(sampleC), 132)
  assert.strictEqual(run(sampleD), 136)
  assert.strictEqual(run(sampleE), 81)
  assert.strictEqual(run(sampleF, true), 8)
  assert.strictEqual(run(sampleG, true), 32)
  assert.strictEqual(run(sampleH, true), 72)
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 4192)
  assert.strictEqual(run(input, true), 1790)
})
