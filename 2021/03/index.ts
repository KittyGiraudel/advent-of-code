import $ from '../../helpers'

type Output = { gamma: string; epsilon: string }

export const getEpsilonAndGamma = (items: string[]) =>
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

export const getOxygen = getGasValue(hasMore1 => +hasMore1)
export const getCO2 = getGasValue(hasMore1 => +!hasMore1)
