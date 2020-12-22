const sum = require('../helpers/sum')
const intersection = require('../helpers/intersection')

// Parse a food to retrieve its ingredient and allergens.
// @param {String} food - Raw food
// @return {Object}
const parseFood = food => {
  // Delimiters          : /                           /
  // Capture group       :  (     )
  // Anything but `(`    :   [^(]+
  // Literal `(contains `:         \(contains
  // Capture group       :                    (     )
  // Anything but `)`    :                     [^)]+
  // Literal `)`         :                           \)
  const match = food.match(/([^(]+)\(contains ([^)]+)\)/).map(v => v.trim())

  return {
    ingredients: match[1].split(' '),
    allergens: match[2].split(/,\s*/g),
  }
}

// Map food input.
// @param {String[]} input - Raw foods
// @return {Object}
const mapFood = input =>
  mapAllergens(
    input.map(parseFood).reduce(
      (acc, { ingredients, allergens }) =>
        allergens.reduce((acc, allergen) => {
          acc[allergen] = acc[allergen] || { foods: [] }
          acc[allergen].foods.push(ingredients)
          return acc
        }, acc),
      {}
    )
  )

// Map allergens to a specific ingredient.
// @param {Object} map - Food map (output of `mapFood`)
// @return {Object}
const mapAllergens = map => {
  const found = new Set()
  const isNotFound = ingredient => !found.has(ingredient)
  const isResolved = allergen => Boolean(map[allergen].food)

  while (!Object.keys(map).every(isResolved)) {
    Object.keys(map).forEach(allergen => {
      const candidates = intersection(...map[allergen].foods).filter(isNotFound)

      if (candidates.length === 1) {
        found.add(candidates[0])
        map[allergen].food = candidates[0]
      }
    })
  }

  return map
}

// Get all ingredients (with duplicates).
// @param {String[]} input - Raw foods
// @return {String[]}
const getAllIngredients = input =>
  input.reduce((acc, food) => acc.concat(parseFood(food).ingredients), [])

// Find the ingredients which are allergen-free.
// @param {String[]} input - Raw foods
// @return {String[]}
const findAllergenFreeIngredients = input => {
  const map = mapFood(input)
  const allergenIngredients = Object.values(map).map(({ food }) => food)
  const isAllergenFree = ingredient => !allergenIngredients.includes(ingredient)

  return getAllIngredients(input).filter(isAllergenFree)
}

// Count how many times allergen-free ingredients appear in the food input.
// @param {String[]} input - Raw foods
// @return {Number}
const countAllergenFreeOccurrences = input => {
  const count = (acc, ing) => ({ ...acc, [ing]: acc[ing] + 1 || 1 })
  const ingredients = findAllergenFreeIngredients(input)
  const allIngredients = getAllIngredients(input)
  const occurrences = allIngredients
    .filter(ingredient => ingredients.includes(ingredient))
    .reduce(count, {})

  return sum(Object.values(occurrences))
}

// Compute the canonical dangerous list.
// @param {String[]} input - Raw foods
// @return {String}
const getCanonicalDangerousList = input => {
  const map = mapFood(input)

  return Object.keys(map)
    .sort()
    .map(allergen => map[allergen].food)
    .join(',')
}

module.exports = {
  countAllergenFreeOccurrences,
  getCanonicalDangerousList,
}
