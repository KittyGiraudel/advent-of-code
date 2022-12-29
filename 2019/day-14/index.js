import $ from '../../helpers'

const parseIngredient = string => {
  const [amount, type] = string.split(' ')

  return { ingredient: type, amount: +amount }
}

const parseRecipes = input =>
  input.reduce((acc, line) => {
    const [from, to] = line.split(' => ')
    const ingredients = from.split(', ').map(parseIngredient)
    const output = parseIngredient(to)

    acc[output.ingredient] = { servings: output.amount, ingredients }

    return acc
  }, {})

const getOreCost = (state, { ingredient, amount }) => {
  const supply = state.supplies[ingredient] ?? 0

  // If the ingredient we are trying to produce is ORE, this means we are
  // dealing with raw materials and we can simply increment the amount of ore
  // we need.
  if (ingredient === 'ORE') {
    state.ore += amount
    return state
  }

  // If we already own at least the quantity of the ingredient we are trying to
  // produce, we can just use our supplies and there is no need to do anything
  // else.
  else if (supply >= amount) {
    state.supplies[ingredient] -= amount
    return state
  }

  // Otherwise, we need to make that recipe (and all its sub-recipes), and
  // potentially store leftover ingredients we may get..
  else {
    const recipe = state.recipes[ingredient]

    // The amount of units we actually need to produce is equal to the amount
    // of units we need minus any leftover supply of units we already had from
    // a previous recipe. For instance, if we need 10 units but we had 4 left-
    // over, we effectively need 6 units.
    const amountNeeded = amount - supply

    // The amount of batches we need to produce is equal to the amount of
    // units we need divided by the quantity of units in a batch, rounded
    // upwards. For instance, if we need 3 eggs and eggs are sold in boxes of
    // 6, we need 1 batch. We can’t get half a batch.
    const batches = Math.ceil(amountNeeded / recipe.servings)

    // Because we can only produce whole batches, we may be left with
    // additional units we do not need right now. We should store them as they
    // may be needed in further recipes.
    state.supplies[ingredient] = batches * recipe.servings - amountNeeded

    // Finally, we recursively go through the sub-ingredients, times the
    // amount of batches we need to produce.
    return recipe.ingredients
      .map(i => ({ ingredient: i.ingredient, amount: i.amount * batches }))
      .reduce(getOreCost, state)
  }
}

// So I struggled back in 2019 with this one, and I struggled in 2020 again
// and then in 2022… Every time, I got stumped as to how to best handle leftover
// ingredients across recipes. I eventually landed on a nice implementation in
// Python on Reddit which I could follow and reimplement with a coding style
// closer to what I originally wrote (a recursive approach).
// Ref: https://github.com/jeffjeffjeffrey/advent-of-code/blob/master/2019/day_14.ipynb
export const getFuelCost = (input, amount = 1) =>
  getOreCost(
    { recipes: parseRecipes(input), supplies: {}, ore: 0 },
    { ingredient: 'FUEL', amount }
  ).ore

export const getFuelAmount = (input, supply = 1_000_000_000_000) =>
  $.binarySearch(1, supply, i => supply - getFuelCost(input, i))
