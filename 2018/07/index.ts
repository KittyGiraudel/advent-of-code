import $ from '../../helpers'
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getGraph = (input: string[]) => {
  const pairs = input.map(line => line.slice(1).match(/([A-Z])/g) as string[])
  const graph = new Map<string, Set<string>>()

  pairs.forEach(([a, b]) => {
    const setA = graph.get(a) || new Set()
    const setB = graph.get(b) || new Set()
    setB.add(a)
    graph.set(a, setA)
    graph.set(b, setB)
  })

  return graph
}

export const sequential = (input: string[]) => {
  const order = []
  const graph = getGraph(input)

  // Algorithm taken from Reddit because mine, while very clever, didn’t quite
  // work unfortunately. This one seems to make sense and is simple enough.
  // 1. Find the first letter (alphabetically speaking) that has no dependency.
  // 2. Remove it from the graph.
  // 3. Remove it from the other letters’ dependencies.
  // 4. Push it into the order.
  // 5. Repeat.
  // https://www.reddit.com/r/adventofcode/comments/a3wmnl/comment/ebbg934/?utm_source=reddit&utm_medium=web2x&context=3
  while (graph.size) {
    const next = Array.from(graph.keys())
      .sort()
      .find(key => !graph.get(key)!.size)!
    graph.delete(next)
    for (let [key] of graph) graph.get(key)!.delete(next)
    order.push(next)
  }

  return order.join('')
}

export const parallel = (
  input: string[],
  workers: number = 5,
  offset: number = 60
) => {
  const graph = getGraph(input)
  // Contains the letter in order of resolution, just like in the sequential
  // function.
  const order: string[] = []
  // Contains the parallel jobs as dealt by the workers.
  const jobs: { time: number; letter: string }[] = []
  // Contains the next item to be fully resolved as it got processed by a job.
  let next: string | null = null
  // Contains the duration it takes to fulfill the whole queue.
  let duration = 0

  while (graph.size) {
    // Find all jobs that:
    // 1. Do not have any dependency in the graph, and thus considered ready.
    // 2. Are not currently being processed by a worker already.
    // 3. Have not been fully processed by a worker yet.
    const ready = Array.from(graph.keys())
      .sort()
      .filter(letter => {
        const isReady = graph.get(letter)!.size === 0
        const isProcessed = jobs.map(job => job.letter).includes(letter)
        const isNext = letter === next

        return isReady && !isProcessed && !isNext
      })

    jobs.push(
      ...ready.slice(0, workers - jobs.length).map(letter => ({
        letter,
        time: offset + ALPHABET.indexOf(letter) + 1,
      }))
    )

    // Fully resolving an item (as in removing it from the graph) is more of a
    // side-effect and should not be counted in the loop run. That means no
    // incrementing of the counter, and no ticking down running jobs.
    if (next) {
      graph.delete(next)
      for (let [key] of graph) graph.get(key)!.delete(next)
      order.push(next)
      next = null
    } else {
      duration++
      jobs.forEach(job => job.time--)
      jobs.forEach((job, i, array) => {
        if (!job.time) next = array.splice(i, 1).pop()!.letter
      })
    }
  }

  return { duration, order: order.join('') }
}
