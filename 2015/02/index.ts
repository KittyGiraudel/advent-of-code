import $ from '../../helpers'

export const getPaperMeasurements = (lines: string[]) =>
  $.sum(
    lines.map(line => {
      const [l, w, h] = $.numbers(line)
      const areas = [l * w, w * h, h * l]

      return $.sum(areas) + $.sum(areas) + Math.min(...areas)
    })
  )

export const getRibbonMeasurements = (lines: string[]) =>
  $.sum(
    lines.map(line => {
      const [l, w, h] = $.numbers(line)

      return l * 2 + w * 2 + h * 2 - Math.max(l, w, h) * 2 + l * w * h
    })
  )
