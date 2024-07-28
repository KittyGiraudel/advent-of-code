import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { battle, cheat } from './'

test('Day 24 — Sample', () => {
  const sample = $.sample(
    `
  Immune System:
  17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
  989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

  Infection:
  801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
  4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4
  `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(battle(sample), 5216)
  assert.strictEqual(cheat(sample), 51)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(battle(input), 10_890)
  assert.strictEqual(cheat(input), 7730)
})
