const $ = require('../../helpers')

const getEpsilonAndGamma = items =>
  $.array(items[0].length).reduce(
    (acc, _, i) => {
      const column = $.column(items, i).join('')
      const gamma = $.countInString(column, '1') > items.length / 2

      acc.gamma += +gamma
      acc.epsilon += +!gamma

      return acc
    },
    { gamma: '', epsilon: '' }
  )

const getGasValue = predicate => items =>
  $.array(items[0].length).reduce((acc, _, i) => {
    const column = $.column(acc, i).join('')
    const hasMore1 = $.countInString(column, '1') >= acc.length / 2
    const main = predicate(hasMore1)

    return acc.length === 1 ? acc : acc.filter(item => +item[i] === main)
  }, items)[0]

const getOxygen = getGasValue(hasMore1 => +hasMore1)
const getCO2 = getGasValue(hasMore1 => +!hasMore1)

module.exports = { getEpsilonAndGamma, getOxygen, getCO2 }
