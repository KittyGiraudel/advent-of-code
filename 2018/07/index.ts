import $ from '../../helpers'

const getGraph = (input: string[]) => {
  const pairs = input.map(line => $.match(line.slice(1), /([A-Z])/g))
  const graph = new Map<string, Set<string>>()

  pairs.forEach(([a, b]) => {
    const setA = graph.get(a) || new Set<string>()
    const setB = graph.get(b) || new Set<string>()
    setB.add(a)
    graph.set(a, setA)
    graph.set(b, setB)
  })

  return graph
}

export const sequential = (input: string[]) => {
  const graph = getGraph(input)
  const keys = Array.from(graph.keys()).sort()
  const order: string[] = []

  const findNext = (key: string) =>
    !order.includes(key) &&
    Array.from(graph.get(key)!).every(item => order.includes(item))

  while (order.length !== keys.length) order.push(keys.find(findNext)!)

  return order.join('')

  // Algorithm taken from Reddit because mine, while very clever, didn’t quite
  // work unfortunately. This one seems to make sense and is simple enough.
  // 1. Find the first letter (alphabetically speaking) that has no dependency.
  // 2. Remove it from the graph.
  // 3. Remove it from the other letters’ dependencies.
  // 4. Push it into the order.
  // 5. Repeat.
  // https://www.reddit.com/r/adventofcode/comments/a3wmnl/comment/ebbg934/?utm_source=reddit&utm_medium=web2x&context=3
  // Edit: Implementation preserved for posterity, but replaced with a BFS
  // search which works just as well.
  /*
  while (graph.size) {
    const next = Array.from(graph.keys())
      .sort()
      .find(key => !graph.get(key)!.size)!
    graph.delete(next)
    for (const [key] of graph) graph.get(key)!.delete(next)
    order.push(next)
  }

  return order.join('')
  */
}

export const parallel = (input: string[], help = 5, offset = 60) => {
  type Worker = { collecting: string; timer: number }

  const graph = getGraph(input)
  const keys = Array.from(graph.keys()).sort()

  const createWorker = () => ({
    collecting: '',
    timer: Number.POSITIVE_INFINITY,
  })
  const getLetterDuration = (letter: string) =>
    offset + letter.charCodeAt(0) - 64
  const findNext = (workers: Worker[], collected: string[]) =>
    keys.find(key => {
      if (collected.includes(key)) return false
      if (workers.find(worker => worker.collecting === key)) return false
      const dependencies = Array.from(graph.get(key)!)
      return dependencies.every(item => collected.includes(item))
    })

  const workers = Array.from({ length: help }, createWorker)
  const collected: string[] = []
  let time = 0

  while (collected.length !== keys.length) {
    // 1. Let idle workers pick up a task
    workers
      .filter(worker => !worker.collecting)
      .forEach(worker => {
        const next = findNext(workers, collected)
        if (next) {
          worker.collecting = next
          worker.timer = getLetterDuration(next)
        }
      })

    // 2. Decrease all timers by 1, and collect done timers
    workers.forEach(worker => {
      if (--worker.timer === 0) {
        collected.push(worker.collecting)
        worker.collecting = ''
        worker.timer = Number.POSITIVE_INFINITY
      }
    })

    // 3. Increase the time by 1
    time++
  }

  return { duration: time, order: collected.join('') }
}
