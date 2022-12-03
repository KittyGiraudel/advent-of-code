const $ = require('../../helpers')

const discard = (set, value) => {
  const next = new Set(set)
  next.delete(value)
  return next
}

// This is faster than `Array.prototype.split` + `Array.prototype.includes`,
// or `String.prototype.search`.
const matches = (port, edge) =>
  port.startsWith(edge + '/') || port.endsWith('/' + edge)

const getPaths = (ports, edge, score = 0, length = 1) => {
  // Find the available ports which have an edge matching the current one.
  const options = Array.from(ports).filter(port => matches(port, edge))

  // If there are no more options, it means we’re done with that bridge.
  if (options.length === 0) {
    return { score: score + edge, length }
  }

  // For each matching port, fork the set of available ports without it, and
  // recursive look for new nodes.
  return options.reduce((acc, port) => {
    // I ttried a few alternatives here, between splitting and searching, or
    // slicing before/after the slash, and it’s all pretty much the same.
    const sides = port.split('/')
    const newEdge = port.startsWith(edge + '/') ? sides.pop() : sides.shift()
    const newPorts = discard(ports, port)

    return acc.concat(
      getPaths(newPorts, +newEdge, score + edge * 2, length + 1)
    )
  }, [])
}

const run = input => {
  const starts = input.filter(port => port.startsWith('0/'))
  const bridges = starts
    .map(start => {
      const ports = discard(input, start)
      const edge = +start.split('/').pop()
      return getPaths(ports, edge)
    })
    .flat()

  return bridges
}

module.exports = { run }
