const getEpsilonAndGamma = items =>
  Array.from({ length: items[0].length }).reduce(
    (acc, _, index) => {
      const digits = items.map(item => +item[index])
      const gamma = digits.filter(Boolean).length >= items.length / 2 ? 1 : 0

      acc.gamma += gamma
      acc.epsilon += +!gamma

      return acc
    },
    { gamma: '', epsilon: '' }
  )

const getGasValue = predicate => items =>
  Array.from({ length: items[0].length }).reduce((acc, _, index) => {
    const digits = acc.map(item => +item[index])
    const hasMore1 = digits.filter(Boolean).length >= digits.length / 2
    const main = predicate(hasMore1)

    return acc.length === 1 ? acc : acc.filter(item => +item[index] === main)
  }, items)[0]

const getOxygen = getGasValue(hasMore1 => +hasMore1)
const getCO2 = getGasValue(hasMore1 => +!hasMore1)

module.exports = { getEpsilonAndGamma, getOxygen, getCO2 }
