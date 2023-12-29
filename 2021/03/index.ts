import $ from '../../helpers'

type Output = { gamma: string; epsilon: string }

const getEpsilonAndGamma = (items: string[]) =>
  $.array(items[0].length).reduce(
    (acc, _, i) => {
      const column = $.column(items, i).join('')
      const gamma = $.countInString(column, '1') > items.length / 2

      acc.gamma += +gamma
      acc.epsilon += +!gamma

      return acc
    },
    { gamma: '', epsilon: '' } as Output
  )

const getGasValue =
  (predicate: (hasMore1: boolean) => number) => (items: string[]) =>
    $.array(items[0].length).reduce((acc, _, i) => {
      const column = $.column(acc, i).join('')
      const hasMore1 = $.countInString(column, '1') >= acc.length / 2
      const main = predicate(hasMore1)

      return acc.length === 1 ? acc : acc.filter(item => +item[i] === main)
    }, items)[0]

const getOxygen = getGasValue(hasMore1 => +hasMore1)
const getCO2 = getGasValue(hasMore1 => +!hasMore1)

export const run = (input: string[], part2: boolean = false) => {
  const { gamma, epsilon } = getEpsilonAndGamma(input)
  const oxygen = getOxygen(input)
  const CO2 = getCO2(input)

  return part2
    ? parseInt(oxygen, 2) * parseInt(CO2, 2)
    : parseInt(gamma, 2) * parseInt(epsilon, 2)
}
