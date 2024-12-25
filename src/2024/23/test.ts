import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', () => {
  const sample = $.sample(
    `
    kh-tc
    qp-kh
    de-cg
    ka-co
    yn-aq
    qp-ub
    cg-tb
    vc-aq
    tb-ka
    wh-tc
    yn-cg
    kh-ub
    ta-co
    de-co
    tc-td
    tb-wq
    wh-td
    ta-ka
    td-qp
    aq-cg
    wq-ub
    ub-vc
    de-ta
    wq-aq
    wq-vc
    wh-yn
    ka-de
    kh-ta
    co-tc
    wh-qp
    tb-vc
    td-yn
    `
  )

  assert.strictEqual(run(sample), 7)
  assert.strictEqual(run(sample, true), 'co,de,ka,ta')
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1306) // 1350 too low
  assert.strictEqual(run(input, true), 'bd,dk,ir,ko,lk,nn,ob,pt,te,tl,uh,wj,yl')
})
