import $ from '../../helpers'

// Parse a food to retrieve its ingredient and allergens.
// @param food - Raw food
const parseFood = (food: string) => {
  // Delimiters          :    /                           /
  // Capture group       :     (     )
  // Anything but `(`    :      [^(]+
  // Literal `(contains `:            \(contains
  // Capture group       :                       (     )
  // Anything but `)`    :                        [^)]+
  // Literal `)`         :                              \)
  const match = $.match(food, /([^(]+)\(contains ([^)]+)\)/).map(v => v.trim())

  return {
    ingredients: match[1].split(' '),
    allergens: match[2].split(/,\s*/g),
  }
}

type Map = Record<string, { foods: string[][]; food: string }>

// Map food input.
// @param input - Raw foods
const mapFood = (input: string[]) =>
  mapAllergens(
    input.map(parseFood).reduce(
      (acc, { ingredients, allergens }) =>
        allergens.reduce<Map>((acc, allergen) => {
          type Allergen = keyof typeof acc
          acc[allergen as Allergen] = acc[allergen as Allergen] || { foods: [] }
          acc[allergen as Allergen].foods.push(ingredients)
          return acc
        }, acc),
      {}
    )
  )

// Map allergens to a specific ingredient.
// @param map - Food map (output of `mapFood`)
const mapAllergens = (map: Map) => {
  const found = new Set<string>()
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
const getAllIngredients = (input: string[]) =>
  input.reduce<string[]>(
    (acc, food) => acc.concat(parseFood(food).ingredients),
    []
  )

// Find the ingredients which are allergen-free.
// @param input - Raw foods
const findAllergenFreeIngredients = (input: string[]) => {
  const map = mapFood(input)
  const allergenIngredients = Object.values(map).map(({ food }) => food)
  const isAllergenFree = (ingredient: string) =>
    !allergenIngredients.includes(ingredient)

  return getAllIngredients(input).filter(isAllergenFree)
}

// Count how many times allergen-free ingredients appear in the food input.
// @param input - Raw foods
export const countAllergenFreeOccurrences = (input: string[]) => {
  const count = (acc: Record<string, number>, ing: string) => ({
    ...acc,
    [ing]: acc[ing] + 1 || 1,
  })
  const ingredients = findAllergenFreeIngredients(input)
  const allIngredients = getAllIngredients(input)
  const occurrences = allIngredients
    .filter(ingredient => ingredients.includes(ingredient))
    .reduce(count, {})

  return $.sum(Object.values(occurrences))
}

// Compute the canonical dangerous list.
// @param input - Raw foods
export const getCanonicalDangerousList = (input: string[]) => {
  const map = mapFood(input)

  return Object.keys(map)
    .sort()
    .map(allergen => map[allergen].food)
    .join(',')
}
