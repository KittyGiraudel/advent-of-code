// MinHeap: https://stackoverflow.com/a/66511107
// A collection of functions that operate on an array of [key,...data] elements
// (nodes).
const MinHeap = {
  // siftDown: The node at the given index of the given heap is sifted down in
  // its subtree until it does not have a child with a lesser value.
  siftDown(arr, i = 0, value = arr[i]) {
    if (i < arr.length) {
      let key = value[0] // Grab the value to compare with
      while (true) {
        // Choose the child with the least value
        let j = i * 2 + 1
        if (j + 1 < arr.length && arr[j][0] > arr[j + 1][0]) j++
        // If no child has lesser value, then we've found the spot!
        if (j >= arr.length || key <= arr[j][0]) break
        // Copy the selected child node one level up...
        arr[i] = arr[j]
        // ...and consider the child slot for putting our sifted node
        i = j
      }
      arr[i] = value // Place the sifted node at the found spot
    }
  },

  // heapify: The given array is reordered in-place so that it becomes a valid
  // heap. Elements in the given array must have a [0] property (e.g. arrays).
  // That [0] value serves as the key to establish the heap order. The rest of
  // such an element is just payload. It also returns the heap.
  heapify(arr) {
    // Establish heap with an incremental, bottom-up process
    for (let i = arr.length >> 1; i--; ) this.siftDown(arr, i)
    return arr
  },

  // pop: Extracts the root of the given heap, and returns it (the subarray).
  // Returns undefined if the heap is empty
  pop(arr) {
    // Pop the last leaf from the given heap, and exchange it with its root
    return this.exchange(arr, arr.pop()) // Returns the old root
  },

  // exchange: Replaces the root node of the given heap with the given node, and
  // returns the previous root. Returns the given node if the heap is empty.
  // This is similar to a call of pop and push, but is more efficient.
  exchange(arr, value) {
    if (!arr.length) return value
    // Get the root node, so to return it later
    let oldValue = arr[0]
    // Inject the replacing node using the sift-down process
    this.siftDown(arr, 0, value)
    return oldValue
  },

  // push: Inserts the given node into the given heap. It returns the heap.
  push(arr, value) {
    let key = value[0],
      // First assume the insertion spot is at the very end (as a leaf)
      i = arr.length,
      j
    // Then follow the path to the root, moving values down for as long
    // as they are greater than the value to be inserted
    while ((j = (i - 1) >> 1) >= 0 && key < arr[j][0]) {
      arr[i] = arr[j]
      i = j
    }
    // Found the insertion spot
    arr[i] = value
    return arr
  },
}

class PriorityQueue {
  constructor(initial) {
    this.queue = []
    if (initial) this.push(initial)
  }

  get length() {
    return this.queue.length
  }

  push([data, priority]) {
    MinHeap.push(this.queue, [priority, data])
    return this
  }

  pop() {
    return MinHeap.pop(this.queue).reverse()
  }
}

export default PriorityQueue
