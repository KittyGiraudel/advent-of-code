import $ from '../../helpers'

export const computeFuelCost = (mass: number) => Math.floor(mass / 3) - 2

export const computeIterativeFuelCost = (mass: number) => {
  let iterations = [computeFuelCost(mass)]

  while (computeFuelCost(iterations[0]) > 0)
    iterations.unshift(computeFuelCost(iterations[0]))

  return $.sum(iterations)
}
