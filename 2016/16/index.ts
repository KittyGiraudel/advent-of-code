const getChecksum = (disk: number[]): number[] => {
  const checksum: number[] = []

  for (let i = 0; i < disk.length; i += 2) {
    checksum.push(+(disk[i] === disk[i + 1]))
  }

  return checksum.length % 2 === 0 ? getChecksum(checksum) : checksum
}

export const run = (input: string, size: number) => {
  const disk = Array.from(input).map(Number)

  while (disk.length < size) {
    disk.push(0)
    // So what’s interesting is that performance relies a lot on having a single
    // array that gets mutated instead of creating another array or a string at
    // every round. The problem is that we can’t use `.push()` with a lot of
    // arguments, since it blows up the stack. And `.concat()` is not mutative
    // so it would create a new array. By iterating from one character at the
    // time and pushing its flipped bit, we can be pretty fast.
    for (let i = disk.length - 2; i >= 0; i--) {
      // Also, it *feels* like `b ^ 1` to flip the bit is faster than `+!b`.
      disk.push(disk[i] ^ 1)
      // This could be avoided with a slice *after* the loop, but it seems a
      // little faster because it could potentially skip a lot of operations.
      if (disk.length === size) break
    }
  }

  return getChecksum(disk).join('')
}
