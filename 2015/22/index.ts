import $ from '../../helpers'

const SPELL_COST = {
  M: 53,
  D: 73,
  S: 113,
  P: 173,
  R: 229,
}

export const run = (part2: boolean = false) => {
  const initial = {
    move: 'player',
    damage: 9,
    boss: 51,
    health: 50,
    mana: 500,
    armor: 0,
    poison: 0,
    shield: 0,
    recharge: 0,
    spent: 0,
  }

  return $.search.dijkstra({
    start: initial,
    isGoal: curr => curr.boss <= 0 && curr.health > 0,
    toKey: JSON.stringify,
    getCost: (curr, next) => next.spent - curr.spent,
    getNext: curr => {
      // Apply part 2 DoT
      const nextHealth =
        part2 && curr.move === 'player' ? curr.health - 1 : curr.health

      // If killed by DoT, game over
      if (nextHealth <= 0) return []

      // Apply effects
      const nextMana = curr.recharge ? curr.mana + 101 : curr.mana
      const nextBoss = curr.poison ? curr.boss - 3 : curr.boss
      const nextArmor = curr.shield ? 7 : 0

      // If killed by poison, game over
      // Note: it took me a while to understand that I *have to* return that
      // state, since the `isGoal` check is performed when entering the main
      // loop. Without that, a boss death by poison would never be counted.
      if (nextBoss <= 0) {
        return [{ ...curr, boss: nextBoss }]
      }

      // Decrease timers
      const nextShield = Math.max(curr.shield - 1, 0)
      const nextPoison = Math.max(curr.poison - 1, 0)
      const nextRecharge = Math.max(curr.recharge - 1, 0)

      // Boss turn
      if (curr.move === 'boss') {
        return [
          {
            move: 'player',
            spent: curr.spent,
            damage: curr.damage,
            mana: nextMana,
            armor: nextArmor,
            health: nextHealth - Math.max(curr.damage - nextArmor, 1),
            boss: nextBoss,
            poison: nextPoison,
            shield: nextShield,
            recharge: nextRecharge,
          },
        ]
      }

      // Player turn
      return (
        Object.entries(SPELL_COST)
          // Discard moves that are too costly or illegal
          .filter(([spell, cost]) => {
            if (spell === 'S' && nextShield > 0) return false
            if (spell === 'R' && nextRecharge > 0) return false
            if (spell === 'P' && nextPoison > 0) return false
            return cost <= nextMana
          })
          .map(([spell, cost]) => {
            const move = {
              move: 'boss',
              spent: curr.spent + cost,
              damage: curr.damage,
              mana: nextMana - cost,
              health: nextHealth,
              armor: nextArmor,
              boss: nextBoss,
              poison: nextPoison,
              shield: nextShield,
              recharge: nextRecharge,
            }

            if (spell === 'M') move.boss -= 4
            if (spell === 'P') move.poison = 6
            if (spell === 'S') move.shield = 6
            if (spell === 'R') move.recharge = 5
            if (spell === 'D') {
              move.health += 2
              move.boss -= 2
            }

            return move
          })
      )
    },
  }).end.spent
}
