import $ from '../../helpers'

const getPaperMeasurements = (input: string[]) =>
  $.sum(
    input.map(line => {
      const [l, w, h] = $.numbers(line)
      const areas = [l * w, w * h, h * l]

      return $.sum(areas) + $.sum(areas) + Math.min(...areas)
    })
  )

const getRibbonMeasurements = (input: string[]) =>
  $.sum(
    input.map(line => {
      const [l, w, h] = $.numbers(line)

      return l * 2 + w * 2 + h * 2 - Math.max(l, w, h) * 2 + l * w * h
    })
  )

export const run = (input: string[], part2 = false) => {
  if (part2) return getRibbonMeasurements(input)
  else return getPaperMeasurements(input)
}
