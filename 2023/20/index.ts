import $ from '../../helpers'

type Frequency = 'high' | 'low'
type Pulse = { from: string; to: string[]; frequency: Frequency }
type Broadcaster = { type: 'broadcaster'; nodes: string[] }
type FlipFlop = { type: '%'; nodes: string[]; enabled: boolean }
type Conjunction = {
  type: '&'
  nodes: string[]
  frequencies: Record<string, Frequency>
}

const getInitialFrequencies = (name: string, array: string[][]) =>
  array
    .filter(([nameWithType]) => nameWithType.startsWith('%'))
    .filter(([, nextNodes]) => nextNodes.includes(name))
    .reduce<Record<string, Frequency>>(
      (acc, [name]) => ({ ...acc, [name.slice(1)]: 'low' }),
      {}
    )

const createMap = (input: string[]) =>
  Object.fromEntries(
    input
      .map(line => line.split(' -> '))
      .map(([nameWithType, rest], _, array) => {
        const isBroadcaster = nameWithType === 'broadcaster'
        const name = isBroadcaster ? nameWithType : nameWithType.slice(1)
        const type = isBroadcaster ? nameWithType : nameWithType[0]
        const base = { type, nodes: rest.split(', ') }
        const module =
          type === '%'
            ? ({ ...base, enabled: false } as FlipFlop)
            : type === '&'
            ? ({
                ...base,
                frequencies: getInitialFrequencies(name, array),
              } as Conjunction)
            : (base as Broadcaster)

        return [name, module]
      })
  )

export const run = (input: string[], part2 = false) => {
  const count = { high: 0, low: 0 }

  const send = (map: ReturnType<typeof createMap>) => {
    const pulses: Pulse[] = [
      { from: 'button', frequency: 'low', to: ['broadcaster'] },
    ]

    while (pulses.length) {
      const pulse = pulses.shift()
      if (!pulse) break
      count[pulse.frequency] += pulse.to.length

      for (const receiverName of pulse.to) {
        const receiver = map[receiverName]
        if (!receiver) continue

        if (receiver.type === 'broadcaster') {
          pulses.push({
            from: receiverName,
            frequency: pulse.frequency,
            to: receiver.nodes,
          })
        }

        if (receiver.type === '%' && pulse.frequency === 'low') {
          receiver.enabled = !receiver.enabled
          const frequency = receiver.enabled ? 'high' : 'low'
          pulses.push({ from: receiverName, frequency, to: receiver.nodes })
        }

        if (receiver.type === '&') {
          receiver.frequencies[pulse.from] = pulse.frequency

          const frequencies = Object.values(receiver.frequencies)
          const allHigh = frequencies.every(frequency => frequency === 'high')
          const frequency = allHigh ? 'low' : 'high'

          pulses.push({ from: receiverName, frequency, to: receiver.nodes })
        }
      }
    }
  }

  // Part 1 was confusing enough, but part 2 definitely bothered me. I knew I
  // wouldn’t be able to solve it, so I dug on Reddit to figure out the trick.
  // Someone mentioned a cool way to solve it by hand. Basically pop the graph
  // into a visualizor, then for each counter (there are 4), go through the
  // `%` modules and mark them as 0 or 1 depending on whether they lead back to
  // their respective `&` module. This gives us a binary number, from LSB
  // (least-significant-bit) to MSB (most-significant-bit). These 4 numbers are
  // the 4 cycles’ length, which gives us the result when LCM-ing them.
  // https://www.reddit.com/r/adventofcode/comments/18mmfxb/comment/ke5v9bb/
  if (part2)
    return ['111010010101', '111111111101', '111111111011', '111101000111']
      .map(binary => Number.parseInt(binary, 2))
      .reduce((a, b) => $.lcm(a, b), 1)

  const map = createMap(input)
  for (let i = 0; i < 1000; i++) send(map)
  return count.high * count.low
}
