type QueueItem = {
  name: string
  time: number
  steps: string[]
  pressure: number
  finished: boolean
  remaining: string[]
}

type Node = {
  name: string
  flow: number
  tunnels: string[]
}

export const releasePressure = (input: string[]): number => {
  const map: Record<string, Node> = input.reduce((acc, line) => {
    const [, name, flow, tunnels] = line.match(
      /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w,\s]+)/
    )
    const valve = { name, flow: +flow, tunnels: tunnels?.split(/,\s/g) }

    return { ...acc, [name]: valve }
  }, {})

  const getDistances = startName => {
    const walk = (acc, { name, steps }) => {
      if (name in acc && acc[name] <= steps) return acc
      acc[name] = steps

      return map[name].tunnels.reduce(
        (acc, name) => walk(acc, { name, steps: steps + 1 }),
        acc
      )
    }

    return walk({}, { name: startName, steps: 0 })
  }

  const distanceMap = Object.keys(map).reduce(
    (acc, name) => ({ ...acc, [name]: getDistances(name) }),
    {}
  )

  const frontier: QueueItem[] = [
    {
      name: 'AA',
      remaining: Object.values(map)
        .filter(node => node.flow > 0)
        .map(node => node.name),
      time: 30,
      steps: [],
      pressure: 0,
      finished: false,
    },
  ]

  let max = 0

  while (frontier.length) {
    const curr = frontier.pop()

    if (curr.time <= 0) curr.finished = true
    if (curr.finished) continue

    let moved = false
    let distances = distanceMap[curr.name]

    curr.remaining
      .filter(
        name =>
          name !== curr.name && // Not self
          curr.time - distances[name] > 1 // Within time
      )
      .forEach(name => {
        moved = true
        let time = curr.time - distances[name] - 1

        frontier.unshift({
          name,
          time,
          finished: false,
          remaining: curr.remaining.filter(node => node !== name),
          steps: [...curr.steps, name],
          pressure: curr.pressure + time * map[name].flow,
        })
      })

    if (!moved) curr.finished = true
    if (curr.finished && curr.pressure > max) max = curr.pressure
  }

  return max
}
