import $ from '../../helpers'

const isDir = item => item instanceof Dir

class Dir {
  name: string
  content: Array<Dir | File>
  parent: Dir

  constructor(name, parent) {
    this.name = name
    this.content = []
    this.parent = parent
  }

  add(item) {
    this.content.push(item)
  }
}

class File {
  name: string
  size: number

  constructor(name, size) {
    this.name = name
    this.size = Number(size)
  }
}

export const parseOutput = (lines: string[]): Dir => {
  const drive = new Dir('/', null)
  let cwd = null

  lines.forEach(line => {
    // If the line is a dir change, we have 3 possible cases: it sets the cwd to
    // the root dir with `/`, it goes up with `..` in which case we move the cwd
    // to the parent folder, or it goes down with a dir name which case we move
    // the cwd to the relevant folder item.
    if (line.startsWith('$ cd')) {
      const name = line.split(' ').pop()
      if (name === '/') cwd = drive
      else if (name === '..') cwd = cwd.parent
      else cwd = cwd.content.filter(isDir).find(item => item.name === name)
    }

    // If the line is a list command, there is nothing to do. The listed items
    // will be processed and added to the current working directory in the
    // next clause.
    else if (line === '$ ls') {
    }

    // Add content to our current working directory. For sub-directories,
    // save a reference to the current working directory on their instance
    // so we can easily handle `$ cd ..` without having to maintain a stack.
    else if (line.startsWith('dir')) {
      cwd.add(new Dir(line.split(' ').pop(), cwd))
    } else {
      const [size, name] = line.split(' ')
      cwd.add(new File(name, size))
    }
  })

  return drive
}

// Return the size of an item by checking its `size` property for files, or by
// recursively going through its content and computing the size of its
// sub-directories.
const getSize = (item: Dir | File): number =>
  (item as File).size ||
  (item as Dir).content.reduce((acc, item) => acc + getSize(item), 0)

// Return all the directories from the drive as a flat array (no longer nested).
const getDirs = (drive: Dir): Dir[] =>
  drive.content.reduce(function collectDirs(acc, item) {
    return isDir(item)
      ? (item as Dir).content.reduce(collectDirs, [...acc, item])
      : acc
  }, [])

// This is part 1: it computes the total size of all directories which have a
// size below 100,000. To do so, it lists all directories from the drive
// (recursively), get their size, and filter out the ones that are too big.
export const getSmallDirsSize = (drive: Dir): number =>
  $.sum(
    getDirs(drive)
      .map(getSize)
      .filter(size => size <= 100_000)
  )

// This is part 2: it finds the smallest directory which, upon deletion, would
// bring the unused space above 30,000,000. To do so, it lists all directories
// from the drive (recursively), get their size, and filter out the ones that
// do not match the predicate, after which it picks the smallest size.
export const findFreeableSpace = (
  drive: Dir,
  capacity: number = 70_000_000,
  needed: number = 30_000_000
): number => {
  const unused = capacity - getSize(drive)

  return Math.min(
    ...getDirs(drive)
      .map(getSize)
      .filter(size => size + unused >= needed)
  )
}
