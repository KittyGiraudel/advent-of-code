import $ from '../../helpers'
import { Coords, Point } from '../../types'

// The trail is implemented as a linked list. Each node but the first is
// following another node (stored in `previous`), and each node but the last
// maintains a reference to the node that comes after it (stored in `next`).
// Each node maintains its current position as a X,Y vector, and stores its
// visited coordinates in a set (although it’s technically only needed for the
// last one).
class Node {
  previous: Node
  next: Node
  position: Coords
  visited: Set<Point>

  constructor(previous) {
    this.previous = previous
    this.next = null
    this.position = [0, 0]
    this.visited = new Set(['0,0'])
  }

  get head() {
    return this.previous?.head ?? this
  }

  get tail() {
    return this.next?.tail ?? this
  }

  // Perform a step on the given axis (0 for X, 1 for Y) and in the given
  // direction (+1 for top and right, -1 for bottom and left). For any node but
  // the first, perform a distance check to catch up with the previous node if
  // necessary. Then, follow the trail by making the next node move.
  step(axis, direction) {
    const prev = this.previous?.position
    const curr = this.position

    if (!prev) {
      curr[axis] += direction
    } else if (
      Math.abs(prev[0] - curr[0]) > 1 ||
      Math.abs(prev[1] - curr[1]) > 1
    ) {
      if (prev[0] > curr[0]) curr[0]++
      else if (prev[0] < curr[0]) curr[0]--
      if (prev[1] > curr[1]) curr[1]++
      else if (prev[1] < curr[1]) curr[1]--
    }

    this.visited.add($.toPoint(this.position))
    this.next?.step(axis, direction)
  }

  steps(amount: number, axis: number, direction: number): void {
    for (let i = 0; i < amount; i++) this.step(axis, direction)
  }
}

const createNodes = (size: number): Node => {
  let curr = null

  for (let i = 0; i < size; i++) {
    curr = curr ? (curr.next = new Node(curr)) : new Node(null)
  }

  return curr.head
}

export const countTailPositions = (
  input: string[],
  size: number = 2
): number => {
  const head = createNodes(size)

  input.forEach(line => {
    const [direction, amount] = line.split(' ')

    switch (direction) {
      case 'U':
        return head.steps(+amount, 1, +1)
      case 'R':
        return head.steps(+amount, 0, +1)
      case 'D':
        return head.steps(+amount, 1, -1)
      case 'L':
        return head.steps(+amount, 0, -1)
    }
  })

  return head.tail.visited.size
}
