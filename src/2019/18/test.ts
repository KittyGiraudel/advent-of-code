import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', t => {
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

  t.is(run(sampleB), 86)
  t.is(run(sampleC), 132)
  t.is(run(sampleD), 136)
  t.is(run(sampleE), 81)
  t.is(run(sampleF, true), 8)
  t.is(run(sampleG, true), 32)
  t.is(run(sampleH, true), 72)
})

test('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 4192)
  t.is(run(input, true), 1790)
})
