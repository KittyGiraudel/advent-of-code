import $ from '../../helpers'
import { Point } from '../../types'

type Boundary = {
  id?: number
  ciMin?: number
  riMin?: number
  ciMax: number
  riMax: number
}

// This is a bit of an ugly solution, because it’s quite slow. It would likely
// fail on any input that’s bigger than that (in terms of size mainly). But I
// couldn’t figure out the logic to figure out the right result based on
// intersections only. So this one literally renders every rectangle, then
// groups the inches based on how many times they were drawn over. The final
// result is found discarding the inches that have not been drawn over at all,
// or only once (no intersection), and that’s the result.
// @param input - Raw unparsed lines
// @return {Number}
export const countOverlappingInches = (input: string[]) => {
  const claims = parseClaims(input)
  const map = new Map<Point, number>()

  claims.forEach(({ ciMin, ciMax, riMin, riMax }) => {
    for (let ci = ciMin as number; ci <= ciMax; ci++)
      for (let ri = riMin as number; ri <= riMax; ri++)
        map.set(`${ri},${ci}`, (map.get(`${ri},${ci}`) ?? 0) + 1)
  })

  const counts = $.frequency(Array.from(map.values()))

  delete counts['0']
  delete counts['1']

  return $.sum(Object.values(counts))
}

const getIntersection = (a: Boundary, b: Boundary) => {
  const ciMin = Math.max(a.ciMin as number, b.ciMin as number)
  const ciMax = Math.min(a.ciMax, b.ciMax)
  const riMin = Math.max(a.riMin as number, b.riMin as number)
  const riMax = Math.min(a.riMax, b.riMax)

  if (ciMin > ciMax || riMin > riMax) return null

  return { ciMin, ciMax, riMin, riMax } as Boundary
}

const parseClaims = (lines: string[]) =>
  lines
    .map(line => $.match(line, /(\d+)/g).map(Number))
    .map(
      ([id, ciMin, riMin, width, height]) =>
        ({
          id,
          ciMin,
          ciMax: ciMin + width - 1,
          riMin,
          riMax: riMin + height - 1,
        } as Boundary)
    )

// Find the one claim that does not overlap with any other. To do so, iterate
// over every claim, and for each claim, compute the intersection with every
// other claim (besides itself) in the list. The one with no intersection is the
// final one!
// @param input - Raw unparsed lines
export const detect = (input: string[]) =>
  parseClaims(input).find(
    (claim, _, array) =>
      array
        .filter(c => c.id !== claim.id)
        .filter(b => getIntersection(claim, b)).length === 0
  )!.id
