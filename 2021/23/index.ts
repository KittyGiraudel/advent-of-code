import $ from '../../helpers'

const ROOMS_HALLWAY_INDEX = [2, 4, 6, 8]
const MOVEMENT_COST = { A: 1, B: 10, C: 100, D: 1000 }

type Cell = keyof typeof MOVEMENT_COST
type State = {
  hallway: string
  rooms: string[]
  cost: number
}

const toKey = (curr: State) =>
  curr.hallway + ' / ' + curr.rooms.join(' ') + ' / ' + curr.cost

const isGoal = (part2: boolean) => (curr: State) =>
  curr.rooms.join(' ') === (part2 ? 'AAAA BBBB CCCC DDDD' : 'AA BB CC DD')

const parseRooms = (input: string[], part2: boolean = false) => {
  // Read lines 2 and 3 (the lines with the rooms), and remove all spaces and
  // hashes to get 2 rows of 4 letters
  const [top, bottom] = input
    .slice(2, 4)
    .map(row => Array.from(row.replace(/[# ]/g, '')))

  // Then zip rows together to have 4 rooms of 2 letters, or 4 rooms of 4
  // letters for part 2 as we insert the 2 static middle rows
  return $.zip(
    [
      top,
      part2 ? ['D', 'C', 'B', 'A'] : undefined,
      part2 ? ['D', 'B', 'A', 'C'] : undefined,
      bottom,
    ].filter(Boolean) as string[][]
  ).map(row => row.join(''))
}

const hallwayToRooms = (curr: State) => {
  const next: State[] = []
  const hallway = Array.from(curr.hallway)

  hallway.forEach((pod, hallwayIndex) => {
    if (pod === '.') return

    const roomIndex = 'ABCD'.indexOf(pod)
    const room = curr.rooms[roomIndex]
    const spaceInRoom = $.countInString(room, '\\.')
    const otherPodsInRoom = Array.from(room).filter(value => value !== '.')

    if (
      spaceInRoom !== 0 &&
      (!otherPodsInRoom.length ||
        otherPodsInRoom.every(otherPod => otherPod === pod))
    ) {
      const roomHallwayIndex = ROOMS_HALLWAY_INDEX[roomIndex]
      const hallwaySlice =
        hallwayIndex < roomHallwayIndex
          ? hallway.slice(hallwayIndex + 1, roomHallwayIndex + 1)
          : hallway.slice(roomHallwayIndex, hallwayIndex)

      if (Array.from(hallwaySlice).some(hallwaySpot => hallwaySpot !== '.')) {
        return
      }

      const steps = hallwaySlice.length + spaceInRoom
      const roomNextState = $.replace(room, spaceInRoom - 1, pod)

      next.push({
        hallway: $.replace(curr.hallway, hallwayIndex, '.'),
        rooms: $.replace(curr.rooms, roomIndex, roomNextState),
        cost: curr.cost + MOVEMENT_COST[pod as Cell] * steps,
      })
    }
  })

  return next
}

const roomsToHallway = (curr: State) => {
  const next: State[] = []
  const hallway = Array.from(curr.hallway)

  curr.rooms.forEach((currentRoom, roomIndex) => {
    const expectedPodType = 'ABCD'[roomIndex]
    const roomSpots = Array.from(currentRoom)

    // If the room is already in its final state, do not move pods out
    if (roomSpots.every(pod => pod === expectedPodType)) return

    // Only consider the highest pod in the room, as the other are blocked
    const podIndexInRoom = roomSpots.findIndex(cell => cell !== '.')
    const pod = currentRoom[podIndexInRoom]

    // If the room is empty, there is nothing to move
    if (!pod) return

    // If the highest pod is already in the right room and all pods underneath
    // it are also in the right room, do not move it
    if (
      pod === expectedPodType &&
      Array.from(currentRoom.slice(podIndexInRoom)).every(
        cell => cell === expectedPodType
      )
    )
      return

    // Otherwise it can move into the hallway but not in a busy spot or a
    // spot in front of a room, and not if the path to that cell is not free
    hallway.forEach((hallwaySpot, hallwayIndex) => {
      if (ROOMS_HALLWAY_INDEX.includes(hallwayIndex)) return
      if (hallwaySpot !== '.') return

      const roomHallwayIndex = ROOMS_HALLWAY_INDEX[roomIndex]
      const hallwaySlice =
        hallwayIndex < roomHallwayIndex
          ? hallway.slice(hallwayIndex, roomHallwayIndex + 1)
          : hallway.slice(roomHallwayIndex, hallwayIndex + 1)

      if (Array.from(hallwaySlice).some(hallwaySpot => hallwaySpot !== '.')) {
        return
      }

      const steps = hallwaySlice.length + podIndexInRoom

      next.push({
        hallway: $.replace(curr.hallway, hallwayIndex, pod),
        rooms: $.replace(
          curr.rooms,
          roomIndex,
          $.replace(currentRoom, podIndexInRoom, '.')
        ),
        cost: curr.cost + MOVEMENT_COST[pod as Cell] * steps,
      })
    })
  })

  return next
}

export const run = (input: string[], part2: boolean = false) => {
  return $.search.dijkstra<State>({
    start: { hallway: '...........', rooms: parseRooms(input, part2), cost: 0 },
    toKey,
    isGoal: isGoal(part2),
    getCost: (curr, next) => next.cost - curr.cost,
    getNextNodes: curr => [...hallwayToRooms(curr), ...roomsToHallway(curr)],
  }).end.cost
}
