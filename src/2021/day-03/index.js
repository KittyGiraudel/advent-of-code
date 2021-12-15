const getEpsilonAndGamma = items =>
  Array.from({ length: items[0].length }).reduce(
    (acc, _, i) => {
      const column = items.map(item => item[i]).join('')
      const gamma = column.match(/1/g).length > items.length / 2

      acc.gamma += +gamma
      acc.epsilon += +!gamma

      return acc
    },
    { gamma: '', epsilon: '' }
  )

const getGasValue = predicate => items =>
  Array.from({ length: items[0].length }).reduce((acc, _, i) => {
    const column = acc.map(item => item[i]).join('')
    const hasMore1 = column.match(/1/g)?.length >= acc.length / 2
    const main = predicate(hasMore1)

    return acc.length === 1 ? acc : acc.filter(item => +item[i] === main)
  }, items)[0]

const getOxygen = getGasValue(hasMore1 => +hasMore1)
const getCO2 = getGasValue(hasMore1 => +!hasMore1)

module.exports = { getEpsilonAndGamma, getOxygen, getCO2 }
