import $ from '../../helpers'

type Floor = string[]
export type Floors = [Floor, Floor, Floor, Floor]
type State = { elevator: number; floors: Floors }

// This is the necessary optimization for part 2, as outlined by this Reddit
// comment. Basically, similar states need to be pruned, otherwise the search
// space explodes. For instance, the states 0:HG,HM,LG-LM, and 0:LG,LM,HG-HM,
// are semantically equivalent and only one needs to be explored. This is why
// when computing the cache key, we replace letters by numbers, so that both
// states end up as 0:1G,1M,2G-2M,.
// https://www.reddit.com/r/adventofcode/comments/5hoia9/comment/db1v1ws/
const optimizeKey =
  (seen: string[]) =>
  ([name, type]: string) => {
    if (!seen.includes(name)) seen.push(name)
    return seen.indexOf(name) + type
  }

const serializeFloor = (items: Floor) => {
  const seen: string[] = []
  return items.map(optimizeKey(seen)).join('-')
}

const toKey = (curr: State) =>
  curr.elevator + ':' + curr.floors.map(serializeFloor).join(',')

const isValid = (item: string, index: number, items: string[]) =>
  item.endsWith('G') || items.includes(item[0] + 'G')

const unconcat = (a: string[], b: string[]) =>
  a.filter(itemA => !b.includes(itemA))

export const run = (floors: Floors) => {
  const nextElevators = [[1], [0, 2], [1, 3], [2]]
  const count = floors.flat().length

  return $.pathfinding
    .bfs<State>({
      start: { elevator: 0, floors },
      toKey,
      isGoal: curr => curr.floors[3].length === count,
      getNextNodes: curr => {
        const elevator = curr.elevator
        const currFloor = curr.floors[elevator]
        const combinations = $.combinations(currFloor, 2).concat(
          currFloor.map(item => [item])
        )

        const nextStates: State[] = []

        nextElevators[elevator].forEach(nextElevator => {
          const nextFloor = curr.floors[nextElevator]

          for (const content of combinations) {
            if (!nextFloor.concat(content).every(isValid)) continue

            const nextFloors = curr.floors.slice(0) as Floors
            nextFloors[elevator] = unconcat(currFloor, content).sort()
            nextFloors[nextElevator] = nextFloor.concat(content).sort()

            nextStates.push({ elevator: nextElevator, floors: nextFloors })
          }
        })

        return nextStates
      },
    })
    .getPath().length
}
