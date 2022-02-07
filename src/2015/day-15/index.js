const $ = require('../../helpers')

const getPermutationsBy2 = () => $.range(101).map(i => [i, 100 - i])
const getPermutationsBy4 = () => {
  const permutations = []

  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
      for (let k = 0; k <= 100 - i - j; k++) {
        permutations.push([i, j, k, 100 - i - j - k])
      }
    }
  }

  return permutations
}

const CALORIES_INDEX = 4
const PERMUTATIONS = { 2: getPermutationsBy2(), 4: getPermutationsBy4() }
const PROPERTIES = ['capacity', 'durability', 'flavor', 'texture']

const getPropertyScore = (ratios, ingredients) => (_, pi) => {
  const propertyScores = ratios.map((ratio, ri) => ingredients[ri][pi] * ratio)

  return Math.max($.sum(propertyScores), 0)
}

const parseIngredient = line => line.match(/-?\d+/g).map(Number)

const run = (input, calories) => {
  // I couldn’t find a solution that works for a dynamic amount of ingredients
  // since I compute the permutations beforehand.
  const permutations = PERMUTATIONS[input.length]
  const ingredients = input.map(parseIngredient)
  const scores = permutations.map(ratios => {
    const getScore = getPropertyScore(ratios, ingredients)
    const propertiesScores = PROPERTIES.map(getScore)
    const score = $.product(propertiesScores)

    return !calories || getScore(undefined, CALORIES_INDEX) === calories
      ? score
      : 0
  })

  return $.max(scores, calories)
}

module.exports = { run }
