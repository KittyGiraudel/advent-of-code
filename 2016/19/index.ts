import $ from '../../helpers'
import Circularray from 'circularray'

export const run = (size: number, part2 = false) => {
  const circle = new Circularray($.range(size, 1))

  // Find the node that’s on the opposite site of the circle, and store it as a
  // pointer. This is how we’ll avoid aggressively rotating the circle back and
  // forth to delete items.
  let offset = Math.floor(circle.size / 2) - 1
  let pointer = circle.pointer
  while (offset--) pointer = pointer.next

  // Iterate until we have only one item remaining.
  while (circle.size > 1) {
    if (part2) {
      // The pointer sits right before the item being deleted. Move the pointer
      // to that item, and connect its edges to essentially remove it from the
      // linked list and manually update the list size.
      pointer = pointer.next
      pointer.remove()
      circle.size--

      // If there is an even number of items in the circle, move the pointer by
      // 1 so it is at the right spot for the next cycle.
      if (circle.size % 2 === 0) pointer = pointer.next

      // Rotate the circle by 1 clockwise to move to the next player.
      circle.rotate(-1)
    } else {
      circle.rotate(-1).shift()
    }
  }

  return circle.toArray().pop()
}
