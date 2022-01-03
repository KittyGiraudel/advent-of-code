const $ = require('../../helpers')

function* deterministicDice() {
  let index = 0

  while (true) {
    yield ++index
    if (index === 100) index = 0
  }
}

const playDeterministically = (p1p, p2p, max = 1000) => {
  const players = [
    { position: p1p, score: 0 },
    { position: p2p, score: 0 },
  ]
  const dice = deterministicDice()
  let currentPlayerIndex = 0
  let count = 0

  while (players.every(p => p.score < max)) {
    const rolls = [dice.next(), dice.next(), dice.next()].map(r => r.value)
    const player = players[currentPlayerIndex]

    player.position = ((player.position + $.sum(rolls) - 1) % 10) + 1
    player.score += player.position

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
    count += 3
  }

  return {
    winner: +!currentPlayerIndex,
    value: players[currentPlayerIndex].score * count,
  }
}

// Solution shamelessly taken from this implementation found on Reddit because
// I couldn’t figure out how to solve it:
// https://seigler.github.io/marklink/#AYhWEMDdwZwYwE4EsAOAXAUHA9gOxmgAQrgIwCmAkrigK5EC8hAFAuAO7V1oCUhDAPkJtONegDoAtuDRwAFswD0zAPwAeBgC5CPADoATANSKA5jyngUzAB6DD1nhix4CxUmgCM-FiK70+goQA3hiEhDj4RADa4ADKaO4ANIQARvHuALreJGRUYmisHH68oYQANuRE4N5xCQhoySneaXUNhHE4COTeAAyNsZ3dTH2ESDAAggAqtAi43mgItOSlFUT6SEOEI7i0kgBK2GVlML2lAGa0uHBoSHjCh2XMfCFhYTv7DzCGhqVhXWgzObMdabEGEACkhA8PR6hEMUMcYQAvqV2HIkBUWB1sF1CGooTDYQAyImpAY47r46Ew56-cIuIgIT7eKJMo5PRJsx48TkPJ4ZOlIM4sMZTQG016vaqGJhcmBRHpZeFyqIeJX3I7ygBMAslYWqTGY1QAtAiIQS4VC6frybiZe06UjCORjt0XnqmvaVYrLSq1b7PlEddbUt5mE1TR4+JDoZaPCG0oM4UwUo7BRNprNvABCUWZ3ClFF-SqAwgAWRkcikSFwRtt5H6gz4ACpCO8DpqMCjnJFCGcugBHJZXDYnJhRAVnHEsVajbweADcc40hAAzEukN9EX3p8xZ6B50uDyv14RQFu6VOEDPKoQANaH+94pinu9b4Ih-vkIfkEfkeVIJaB7wneWSGl+P5-gBQGWqBhAqCoWx8PC8aSt2ESuDkaBamGvj5AEQjuhh0S1EkZKtGBbi5MUhSiNw27EYQkjkJI2Asrq9K9uwNaTHIXQwHIhz6N4WqoX2lzXLccw4JcaAAOo1jAdaDI2FLJOAAAK2AwI0Wk6aMGbih+kqzuQ1hjDcuAmN4zGsVEMT1qpXTqXpunackeaAhkHFhEKLBmRZNbWdmDBMJc+jkGcNbkPofD-KWAUEEFgrCspFKEAITDcbgvH8YJZSxcZeq2dg9nYs5ZIqe0rmpDVnmzN5LIeMkiohvFWaqi1PmEEWrx+eG9YZVlPF8f++WFe6kolWVjmVWp1XubVi31bgjXjiMaptSWHUbd1vVhLOaDYAkZQKfgLIjK1kpXjeaxIHA5CxLs3inusD1PZIz6EAAnEub2Pbs76Ta8h3ojAZ0hv1K0SnqYSMbgZloOMelhpp2mEJGlr-R90YWihIZhGgYNnd4Mm4PJilpXabaI8ji2JvNCPWEjNUpDVuaGbM25oc6rpFbD8OIwAQijhps+jmPwtjuy47G+Ow4TxM1qT2CyWdSnlQ2c3U0zaAi4taP6br+v6RzYpcyG+2vEdJ3qyyNvgKdikKuqEHDnAo5RNLkhZK2RNjGdLvJA7Tv4KqruDu7nve77hD++DNbh3tdLTQ5VUMxVhtufpK1rXHx2O+rdLtXMIdF8ipQl+WlYWNYzDiA3ZMU-gzCXep6T1P0rTB4s5A8I4KIgMAQA
const playQuantum = (p1p, p2p) => {
  const cache = new Map()
  const frequencies = getSumFrequencies()
  const sums = Array.from(frequencies.keys())

  const countWins = (p1, p2, playerIndex) => {
    const key = [
      p1.score,
      p1.position,
      p2.score,
      p2.position,
      playerIndex,
    ].join(',')

    if (p1.score >= 21) cache.set(key, [1, 0])
    if (p2.score >= 21) cache.set(key, [0, 1])

    if (cache.has(key)) return cache.get(key)

    const wins = [0, 0]

    // Iterate on every possible sum (from 3 yielded by 1-1-1 to 9 yielded by
    // 3-3-3). Resolve the outcome for every sum based on whether the current
    // player is the first or the second player. Then, multiple that outcome by
    // the frequency of that sum in every possible roll. For instance, 3 can
    // only be made by rolling 1-1-1, but 4 can be achieved by rolling 1-2-1,
    // 1-1-2 or 2-1-1.
    for (let i = Math.min(...sums); i <= Math.max(...sums); i++) {
      if (playerIndex === 0) {
        const nextP1 = { ...p1 }
        nextP1.position = ((p1.position - 1 + i) % 10) + 1
        nextP1.score += nextP1.position

        const curr = countWins(nextP1, p2, 1)
        wins[0] += frequencies.get(i) * curr[0]
        wins[1] += frequencies.get(i) * curr[1]
      } else {
        const nextP2 = { ...p2 }
        nextP2.position = ((p2.position - 1 + i) % 10) + 1
        nextP2.score += nextP2.position

        const curr = countWins(p1, nextP2, 0)
        wins[0] += frequencies.get(i) * curr[0]
        wins[1] += frequencies.get(i) * curr[1]
      }
    }

    cache.set(key, wins)
    return wins
  }

  return Math.max(
    ...countWins({ position: p1p, score: 0 }, { position: p2p, score: 0 }, 0)
  )
}

const getSumFrequencies = () => {
  const frequencies = new Map()

  for (let i = 1; i <= 3; i++)
    for (let j = 1; j <= 3; j++)
      for (let k = 1; k <= 3; k++)
        frequencies.set(i + j + k, (frequencies.get(i + j + k) ?? 0) + 1)

  return frequencies
}

module.exports = { playDeterministically, playQuantum }
