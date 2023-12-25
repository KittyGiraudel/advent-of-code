import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 25 — Sample', t => {
  const sample = $.sample(
    `
    jqt: rhn xhk nvd
    rsh: frs pzl lsr
    xhk: hfx
    cmg: qnr nvd lhk bvb
    rhn: xhk bvb hfx
    bvb: xhk hfx
    pzl: lsr hfx nvd
    qnr: nvd
    ntq: jqt hfx bvb xhk
    nvd: lhk
    lsr: lhk
    rzs: qnr cmg lsr rsh
    frs: qnr lhk lsr
    `
  )
  t.is(run(sample), 54)
})

test.skip('Day 25 — Solutions', t => {
  const input = $.readInput(import.meta)
  // Taken from a short Python implementation on Reddit. The resolution time is
  // very random though as it repeatedly pick a pair at random; if it picks the
  // right now to begin with, it could be fast. Or not.
  // See: https://www.reddit.com/r/adventofcode/comments/18qbsxs/comment/ketzp94
  t.is(run(input), 614_655)
})
