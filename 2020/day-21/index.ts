import $ from '../../helpers'

// Parse a food to retrieve its ingredient and allergens.
// @param food - Raw food
const parseFood = (
  food: string
): { ingredients: Array<string>; allergens: Array<string> } => {
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

type Map = Record<string, { foods: Array<string>[]; food: string }>

// Map food input.
// @param input - Raw foods
const mapFood = (input: Array<string>): Map =>
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
// @param map - Food map (output of `mapFood`)
const mapAllergens = (map: Map): Map => {
  const found: Set<string> = new Set()
  const isNotFound = (ingredient: string) => !found.has(ingredient)
  const isResolved = (allergen: string) => Boolean(map[allergen].food)
  const keys = Object.keys(map)

  while (!keys.every(isResolved)) {
    keys.forEach(allergen => {
      const candidates = $.intersection(...map[allergen].foods).filter(
        isNotFound
      )

      if (candidates.length === 1) {
        found.add(candidates[0])
        map[allergen].food = candidates[0]
      }
    })
  }

  return map
}

// Get all ingredients (with duplicates).
// @param input - Raw foods
const getAllIngredients = (input: Array<string>): Array<string> =>
  input.reduce((acc, food) => acc.concat(parseFood(food).ingredients), [])

// Find the ingredients which are allergen-free.
// @param input - Raw foods
const findAllergenFreeIngredients = (input: Array<string>): Array<string> => {
  const map = mapFood(input)
  const allergenIngredients = Object.values(map).map(({ food }) => food)
  const isAllergenFree = (ingredient: string) =>
    !allergenIngredients.includes(ingredient)

  return getAllIngredients(input).filter(isAllergenFree)
}

// Count how many times allergen-free ingredients appear in the food input.
// @param input - Raw foods
export const countAllergenFreeOccurrences = (input: Array<string>): number => {
  const count = (acc, ing: string) => ({ ...acc, [ing]: acc[ing] + 1 || 1 })
  const ingredients = findAllergenFreeIngredients(input)
  const allIngredients = getAllIngredients(input)
  const occurrences = allIngredients
    .filter(ingredient => ingredients.includes(ingredient))
    .reduce(count, {})

  return $.sum(Object.values(occurrences))
}

// Compute the canonical dangerous list.
// @param input - Raw foods
export const getCanonicalDangerousList = (input: Array<string>): string => {
  const map = mapFood(input)

  return Object.keys(map)
    .sort()
    .map(allergen => map[allergen].food)
    .join(',')
}
