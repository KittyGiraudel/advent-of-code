import $ from '../../helpers'

const createRepresentation = (input: string) => {
  const base: number[] = []
  const map = new Map<number, number>()
  let id = 0

  Array.from(input)
    .map(Number)
    .forEach((value, index) => {
      if (index % 2 === 0) {
        base.push(...$.array(value).map(_ => id))
        map.set(id, value)
        id++
      } else {
        base.push(...$.array(value).map(_ => -1))
      }
    })

  return [base, map] as const
}

const findEmptySlot = (disk: number[], leftOf: number, size: number) => {
  outer: for (let index = 0; index < leftOf; index++) {
    // If the value at the current index is not empty, move one since we only
    // care about emoty slots
    if (disk[index] !== -1) continue

    // Once we’ve found an empty slot, check the subsequent slots to see if
    // there are enough successive empty slots to hold our file
    for (let count = 0; count < size; count++) {
      // If we find a non-empty spot, it means the space is not big enough and
      // we can jump to the next empty slot on the disk.
      if (disk[index + count] !== -1) continue outer
    }

    return index
  }

  return -1
}

export const run = (input: string, part2 = false) => {
  const [disk, map] = createRepresentation(input)

  if (part2) {
    // We find the highest value, we try to move it, then decrement by one and
    // keep going down until we reach 0.
    for (let max = $.max(disk); max >= 0; max--) {
      // First, we find at which index the current value (`max`) lives. We also
      // retrieve how many times it exists successively (preemptively cached in
      // a map to avoid having to compute it here).
      const index = disk.indexOf(max)
      const size = map.get(max)!
      const empty = findEmptySlot(disk, index, size)

      // If there no slot big enough to store our file, move on to the next
      // value.
      if (empty === -1) continue

      // If we did find a slot, we can fill it with our values, *and* remove
      // our values from our current position.
      for (let i = 0; i < size; i++) {
        disk[empty + i] = max
        disk[index + i] = -1
      }
    }
  } else {
    while (disk.includes(-1)) {
      const index = disk.indexOf(-1)
      disk.splice(index, 1, disk.pop()!)
      while (disk.at(-1) === -1) disk.pop()
    }
  }

  return disk.reduce(
    (acc, value, index) => acc + (value === -1 ? 0 : +value * index),
    0
  )
}
