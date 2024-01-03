import { init } from 'z3-solver'
import $ from '../../helpers'
import { TriCoords } from '../../types'

type Hailstone = [TriCoords, TriCoords]

const MIN = 200_000_000_000_000
const MAX = 400_000_000_000_000

const intersects = (a: Hailstone, b: Hailstone) => {
  const [aX, aY] = a[0]
  const [bX, bY] = b[0]
  const avX = aX + a[1][0]
  const bvX = bX + b[1][0]
  const avY = aY + a[1][1]
  const bvY = bY + b[1][1]

  const det = (avX - aX) * (bvY - bY) - (bvX - bX) * (avY - aY)
  if (det === 0) return null
  return ((bvY - bY) * (bvX - aX) + (bX - bvX) * (bvY - aY)) / det
}

const checkIntersection = (pair: [Hailstone, Hailstone]) => {
  const [aPos, aVel] = pair[0]
  const [bPos, bVel] = pair[1]

  const delta = intersects(pair[0], pair[1])

  if (delta === null) {
    return false
  }

  const x = aPos[0] + delta * aVel[0]
  const y = aPos[1] + delta * aVel[1]

  if (
    (x < aPos[0] && aVel[0] > 0) ||
    (x > aPos[0] && aVel[0] < 0) ||
    (x < bPos[0] && bVel[0] > 0) ||
    (x > bPos[0] && bVel[0] < 0)
  ) {
    return false
  }

  if (x < MIN || x > MAX || y < MIN || y > MAX) {
    return false
  }

  return true
}

export const run = async (input: string[], part2: boolean = false) => {
  const paths = input.map(line => $.chunk($.numbers(line), 3) as Hailstone)
  const pairs = $.pairs(paths)

  // This is honestly not my type of problems… It’s basically pure math, with
  // solving 2N then 3N equations, which I’ve never really learnt or know how
  // to do. I found this JavaScript solution which solves P1 manually, and P2
  // with a Z3 solver library. I wrote none of this, and I’m not even mad; I
  // just don’t have fun with these.
  // See: https://pastebin.com/a6FjzJnj
  if (part2) {
    const { Context } = await init()
    // @ts-ignore
    const { Solver, Int } = new Context('main')
    const solver = new Solver()
    const x = Int.const('x')
    const y = Int.const('y')
    const z = Int.const('z')
    const dx = Int.const('dx')
    const dy = Int.const('dy')
    const dz = Int.const('dz')
    const t = paths.map((_, i) => Int.const(`t${i}`))

    paths.forEach(([p, v], i) => {
      solver.add(t[i].mul(v[0]).add(p[0]).sub(x).sub(t[i].mul(dx)).eq(0))
      solver.add(t[i].mul(v[1]).add(p[1]).sub(y).sub(t[i].mul(dy)).eq(0))
      solver.add(t[i].mul(v[2]).add(p[2]).sub(z).sub(t[i].mul(dz)).eq(0))
    })

    await solver.check()

    return Number(solver.model().eval(x.add(y).add(z)).value())
  }

  return pairs.filter(checkIntersection).length
}
