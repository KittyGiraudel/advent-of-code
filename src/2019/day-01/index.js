const $ = require('../../helpers')

const computeFuelCost = mass => Math.floor(mass / 3) - 2
const computeIterativeFuelCost = mass => {
  let iterations = [computeFuelCost(mass)]

  while (computeFuelCost(iterations[0]) > 0)
    iterations.unshift(computeFuelCost(iterations[0]))

  return $.sum(iterations)
}

module.exports = { computeFuelCost, computeIterativeFuelCost }
