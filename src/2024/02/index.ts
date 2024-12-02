import $ from '../../helpers'

const isEverAscending = (report: number[]) => {
  for (let i = 1; i < report.length; i++) {
    if (report[i] <= report[i - 1]) return false
    if (Math.abs(report[i] - report[i - 1]) > 3) return false
  }
  return true
}

const isEverDescending = (report: number[]) => {
  for (let i = 1; i < report.length; i++) {
    if (report[i] >= report[i - 1]) return false
    if (Math.abs(report[i] - report[i - 1]) > 3) return false
  }
  return true
}

const isReportSafe = (report: number[]) =>
  isEverAscending(report) || isEverDescending(report)

// This is a non-mutative version of `Array.prototype.splice`, which leverages
// the `replace` helper by replacing with `null` (or something else potentially)
// and then filtering out that value out.
const splice = <T>(array: T[], index: number, replaceValue = null) =>
  $.replace(array, index, replaceValue).filter(value => value !== replaceValue)

export const run = (input: string[], part2 = false) => {
  return input.map($.numbers).filter(report => {
    const isSafe = isReportSafe(report)

    // For part 2, a report can be considered safe if one of its variants is
    // safe, so if the report was not safe, we need to compute its variants and
    // analyze them.
    if (!part2 || isSafe) return isSafe

    // A report variant is a variation of the report where one of its value has
    // been removed. So a report contains as many variants as it contains items.
    return report.map((_, index) => splice(report, index)).some(isReportSafe)
  }).length
}
