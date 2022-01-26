const $ = require('../../helpers')

const run = (input, inspect = []) => {
  const state = { bot: [], output: [] }
  const pipelines = []

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line.startsWith('value')) {
      const [value, id] = line.match(/\d+/g).map(Number)
      if (!state.bot[id]) state.bot[id] = []
      state.bot[id].push(value)
    } else {
      const [sender, low, high] = line.match(/(bot|output) \d+/g)
      const id = sender.split(' ').pop()
      pipelines[id] = [low.split(' '), high.split(' ')]
    }
  }

  let index = null

  do {
    index = state.bot.findIndex(item => item && item.length === 2)
    const next = state.bot[index]

    if (!next) break

    next.sort((a, b) => a - b)
    const max = next.pop()
    const min = next.pop()

    if (max === inspect[1] && min === inspect[0])
      console.log('Bot', index, 'comparing', inspect)

    const [low, high] = pipelines[index]

    const [lowType, lowId] = low
    state[lowType][lowId] = (state[lowType][lowId] || []).concat(min)

    const [highType, highId] = high
    state[highType][highId] = (state[highType][highId] || []).concat(max)
  } while (index > -1)

  return $.product(state.output.slice(0, 3))
}

module.exports = { run }
