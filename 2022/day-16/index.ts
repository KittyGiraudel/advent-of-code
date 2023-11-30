import $ from '../../helpers'

type Node = {
  name: string
  flow: number
  tunnels: string[]
}

export const releasePressure = (input: string[]) => {
  const map: Record<string, Node> = input.reduce((acc, line) => {
    const [, name, flow, tunnels] =
      line.match(
        /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w,\s]+)/
      ) ?? []
    const valve = { name, flow: +flow, tunnels: tunnels?.split(/,\s/g) }

    return { ...acc, [name]: valve }
  }, {})

  const getDistances = (startName: string) => {
    const walk = (
      acc: Record<string, number>,
      { name, steps }: { name: string; steps: number }
    ): Record<string, number> => {
      if (name in acc && acc[name] <= steps) return acc
      acc[name] = steps

      return map[name].tunnels.reduce(
        (acc, name) => walk(acc, { name, steps: steps + 1 }),
        acc
      )
    }

    return walk({} as Record<string, number>, { name: startName, steps: 0 })
  }

  const distanceMap = Object.keys(map).reduce(
    (acc, name) => ({ ...acc, [name]: getDistances(name) }),
    {}
  )
  type DistanceKey = keyof typeof distanceMap

  const { from } = $.pathfinding.dijkstra({
    start: {
      name: 'AA',
      time: 30,
      pressure: 0,
      remaining: Object.values(map)
        .filter(node => node.flow > 0)
        .map(node => node.name),
    },
    toKey: curr => String(curr.pressure),
    isGoal: curr => curr.time <= 0,
    getCost: (curr, next) => distanceMap[curr.name as DistanceKey][next.name],
    getNextNodes: curr =>
      curr.remaining
        .filter(next => next !== curr.name)
        .filter(
          next => curr.time - distanceMap[curr.name as DistanceKey][next] > 1
        )
        .map(next => {
          const time =
            curr.time - distanceMap[curr.name as DistanceKey][next] - 1

          return {
            name: next,
            time,
            remaining: curr.remaining.filter(node => node !== next),
            pressure: curr.pressure + time * map[next].flow,
          }
        }),
  })

  return Math.max(...Object.keys(from).map(Number))
}
