const OUT_OF_HEALTH = Infinity
const OUT_OF_MOVES = Infinity
const ILLEGAL_MOVE = Infinity
const SPELL_COST = {
  M: 53,
  D: 73,
  S: 113,
  P: 173,
  R: 229,
}

const fight = (actions: string[], hard: boolean) => {
  let effects = { P: 0, S: 0, R: 0 }
  let player = 50
  let boss = 51
  let mana = 500
  let total = 0
  let turn = false

  while (actions.length) {
    turn = !turn

    // Part 2, apply DoT before anything else at the start of the player’s turn
    if (hard && turn && --player <= 0) return OUT_OF_HEALTH

    // Resolve effects
    if (effects.S) effects.S--
    if (effects.P) effects.P--, (boss -= 3)
    if (effects.R) effects.R--, (mana += 101)

    // Check if poison killed the boss
    if (boss <= 0) return total

    if (turn) {
      const spell = actions.shift()

      type Spell = keyof typeof SPELL_COST
      mana -= SPELL_COST[spell as Spell]
      total += SPELL_COST[spell as Spell]

      // If not enough mana to cast the spell, abort
      if (mana < 0) return ILLEGAL_MOVE

      if (spell === 'M') boss -= 4
      else if (spell === 'D') (boss -= 2), (player += 2)
      else {
        type Effect = keyof typeof effects
        if (effects[spell as Effect]) return ILLEGAL_MOVE
        effects[spell as Effect] = spell === 'R' ? 5 : 6
      }

      // Check if the spell killed the boss
      if (boss <= 0) return total
    } else {
      // Resolve boss attack
      player -= 9 - (effects.S ? 7 : 0)

      // Check if the attack killed the player
      if (player <= 0) return OUT_OF_HEALTH
    }
  }

  return OUT_OF_MOVES
}

const iterate = (actions: string[], position: number = 0) => {
  const index = 'MDSPR'.indexOf(actions[position])

  actions[position] = 'DSPRM'[index]

  if (actions[position] === 'M' && position + 1 <= actions.length)
    iterate(actions, position + 1)
}

export const run = (hard: boolean) => {
  // The amount of moves is totally arbitrary here. We estimate that the fight
  // will be over in a maximum of 10 moves. This may vary based on the input.
  const actions = Array.from('M'.repeat(10))

  let min = Infinity

  // I tried doing it with Dijkstra but didn’t manage to figure out the best way
  // to store/cache paths, so I ended up taking inspiration from a brute-force
  // Python implementation:
  // https://www.reddit.com/r/adventofcode/comments/3xspyl/day_22_solutions/cy7l25a/
  // I must say I’m not too sure how many paths we should try. I originally used
  // 1,000,000, and then realized we get the right answer after 100,000 so…
  for (let i = 0; i < 100_000; i++) {
    min = Math.min(min, fight(actions.slice(0), hard))
    // Try the next series of spells.
    iterate(actions)
  }

  return min
}
