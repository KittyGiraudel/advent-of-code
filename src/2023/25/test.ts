import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 25 — Sample', () => {
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
  assert.strictEqual(run(sample), 54)
})

test('Day 25 — Solutions', { skip: true }, () => {
  const input = $.readInput(import.meta)
  // Taken from a short Python implementation on Reddit. The resolution time is
  // very random though as it repeatedly pick a pair at random; if it picks the
  // right now to begin with, it could be fast. Or not.
  // See: https://www.reddit.com/r/adventofcode/comments/18qbsxs/comment/ketzp94
  assert.strictEqual(run(input), 614_655)
})
