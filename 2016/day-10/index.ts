import $ from '../../helpers'

type State = { bot: number[][]; output: number[][] }

export const run = (input: string[]) => {
  const state: State = { bot: [], output: [] }
  const pipelines: [string[], string[]][] = []
  type KeyType = keyof typeof state

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line.startsWith('value')) {
      const [value, id] = line.match(/\d+/g)?.map(Number) ?? []
      if (!state.bot[id]) state.bot[id] = []
      state.bot[id].push(value)
    } else {
      const [sender, low, high] = line.match(/(bot|output) \d+/g) ?? []
      const id = sender!.split(' ').pop()!
      pipelines[+id] = [low.split(' '), high.split(' ')]
    }
  }

  let index = null

  do {
    index = state.bot.findIndex(item => item && item.length === 2)
    const next = state.bot[index]

    if (!next) break

    next.sort((a: number, b: number) => a - b)
    const max = next.pop()!
    const min = next.pop()!

    const [low, high] = pipelines[index]
    const [lowType, lowId] = low as [KeyType, number]
    state[lowType][lowId] = (state[lowType][lowId] || []).concat(min)

    const [highType, highId] = high as [KeyType, number]
    state[highType][highId] = (state[highType][highId] || []).concat(max)
  } while (index > -1)

  return $.product(state.output.slice(0, 3) as unknown as number[])
}
