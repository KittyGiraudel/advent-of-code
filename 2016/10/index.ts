import $ from '../../helpers'

type State = { bot: number[][]; output: number[][] }

export const run = (input: string[]) => {
  const state: State = { bot: [], output: [] }
  const pipelines: [[KeyType, number], [KeyType, number]][] = []
  type KeyType = keyof typeof state

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line.startsWith('value')) {
      const [value, id] = $.numbers(line)
      if (!state.bot[id]) state.bot[id] = []
      state.bot[id].push(value)
    } else {
      const [sender, low, high] = $.match(line, /(bot|output) \d+/g)
      const id = sender!.split(' ').pop()!
      pipelines[+id] = [
        low.split(' ') as [KeyType, number],
        high.split(' ') as [KeyType, number],
      ]
    }
  }

  let index: number | null = null

  do {
    index = state.bot.findIndex(item => item && item.length === 2)
    const next = state.bot[index]

    if (!next) break

    next.sort((a, b) => a - b)
    const max = next.pop()!
    const min = next.pop()!

    const [low, high] = pipelines[index]
    const [lowType, lowId] = low
    state[lowType][lowId] = (state[lowType][lowId] || []).concat(min)

    const [highType, highId] = high
    state[highType][highId] = (state[highType][highId] || []).concat(max)
  } while (index > -1)

  return $.product(state.output.slice(0, 3).flat())
}
