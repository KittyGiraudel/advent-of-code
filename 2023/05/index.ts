import $ from '../../helpers'

type Triplet = [number, number, number]

const createRanges = (group: string) =>
  group
    .split('\n')
    .slice(1)
    .map(line => $.numbers(line) as Triplet)

const convert = (value: number, ranges: Triplet[]) => {
  const range = ranges
    .sort((a, b) => a[0] - b[0])
    .find(([_, source, length]) => value >= source && value <= source + length)

  return range ? value + range[0] - range[1] : value
}

class Range {
  start: number
  end: number
  transformed?: boolean

  constructor(start: number, end: number, transformed?: boolean) {
    this.start = start
    this.end = end
    this.transformed = transformed ?? false
  }

  get length() {
    return this.end - this.start
  }

  public getIntersection(range: Range): Range | null {
    if (this.end <= range.start || this.start >= range.end) {
      return null
    }

    return new Range(
      Math.max(this.start, range.start),
      Math.min(this.end, range.end)
    )
  }

  public subtractIntersection(intersection: Range): Range[] {
    const result: Range[] = []

    if (this.start < intersection.start)
      result.push(new Range(this.start, intersection.start))

    if (this.end > intersection.end)
      result.push(new Range(intersection.end, this.end))

    return result
  }
}

class GardenMap {
  public destination: Range
  public source: Range

  constructor(destination: number, source: number, length: number) {
    this.destination = new Range(destination, destination + length)
    this.source = new Range(source, source + length)
  }

  get offset() {
    return this.destination.start - this.source.start
  }

  public transformRange(input: Range): Range[] {
    if (input.transformed) return [input]

    const intersection = this.source.getIntersection(input)

    if (!intersection) return [input]

    const transformed = new Range(
      intersection.start + this.offset,
      intersection.end + this.offset,
      true
    )

    return [transformed, ...input.subtractIntersection(intersection)]
  }
}

export const run = ([seedGroup, ...rawGroups]: string[], part2 = false) => {
  const seeds = $.numbers(seedGroup)
  const rangeGroups = rawGroups.map(createRanges)

  if (!part2) {
    return Math.min(...seeds.map(seed => rangeGroups.reduce(convert, seed)))
  }

  // I’m not smart enough to solve part 2. I went pretty far with a binary
  // search solution but couldn’t make it work (not even sure if possible). I
  // eventually understood it was about manipulating ranges, finding out their
  // intersection and whatnot, but it’s not something I’m too comfortable with
  // so I followed a TypeScript solution found on Reddit.
  // See: https://github.com/burkayanduv/advent-of-code-2023/blob/main/src/d5/p2.ts
  const pairs = $.chunk(seeds, 2)
  const seedRanges = pairs.map(pair => new Range(pair[0], pair[0] + pair[1]))
  const groups = rangeGroups.map(triplets =>
    triplets.map(triplet => new GardenMap(...triplet))
  )

  const resetTransformed = (ranges: Range[]) => {
    for (const range of ranges) range.transformed = false
    return ranges
  }

  const getGroupTransform = (ranges: Range[], group: GardenMap[]) =>
    group.reduce(
      (acc, map) => acc.flatMap(range => map.transformRange(range)),
      resetTransformed(ranges)
    )

  const getSeedLocation = (ranges: Range[], groups: GardenMap[][]) =>
    groups.reduce(getGroupTransform, ranges)

  return Math.min(
    ...getSeedLocation(seedRanges, groups).map(range => range.start)
  )
}
