import $ from '../../helpers'
import { TriCoords } from '../../types'

const isValid = ([a, b, c]: number[]) => a + b > c && a + c > b && b + c > a

export const run = (input: string[], advanced: boolean = false) =>
  (advanced
    ? $.chunk(input.map($.numbers), 3).flatMap($.zip)
    : input.map($.numbers)
  ).filter(isValid).length
