const pathLength = (graph, start, end) => {
  let length = 0
  let current = end

  while (current !== start) {
    length++
    current = graph[current]
  }

  return length
}

export default pathLength
