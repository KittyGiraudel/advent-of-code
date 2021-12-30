const parseChemical = chemical => {
  const [quantity, type] = chemical.split(' ')
  return { quantity: +quantity, type }
}

const parseLine = line => {
  const [rawInput, rawOutput] = line.split(' => ')
  const chemicals = rawInput.split(/\s*,\s*/g)
  const input = chemicals.map(parseChemical)
  const output = parseChemical(rawOutput)

  return { input, output }
}

const createGraph = input => {
  const recipes = input.map(parseLine)
  const graph = {}

  recipes.forEach(recipe => {
    graph[recipe.output.type] = {
      batchSize: recipe.output.quantity,
      components: recipe.input,
    }
  })

  return graph
}

const merge = (a, b) => {
  const result = {}

  for (const [key, value] of Object.entries(a)) {
    if (!(key in result)) result[key] = 0
    result[key] += value
  }
  for (const [key, value] of Object.entries(b)) {
    if (!(key in result)) result[key] = 0
    result[key] += value
  }

  return result
}

const getPrimitives = (graph, { quantity, type }, depth = 1) => {
  const { components, batchSize } = graph[type]

  // If the component can be converted to ORE, return it as it is considered a
  // primitive component.
  if (components.length === 1) {
    return { [type]: quantity }
  }

  console.log(
    '\n',
    '  '.repeat(depth),
    'Making',
    nearest(quantity, batchSize),
    type,
    quantity !== nearest(quantity, batchSize) ? '(batched up)' : '',
    'requires:\n'
  )
  // If the component cannot directly be converted to ORE, iterate over its
  // sub-components, and recursively find their primitive sub-components,
  // merging them into a common object.
  return components.reduce((acc, component, index) => {
    const q = Math.round(
      (component.quantity / batchSize) * nearest(quantity, batchSize)
    )
    console.log(
      '  '.repeat(depth),
      ' +',
      q,
      component.type,
      'since each batch of',
      batchSize,
      batchSize === 1 ? 'unit requires' : 'units requires',
      component.quantity,
      component.type,
      index === components.length - 1 ? '\n' : ''
    )

    return merge(
      acc,
      getPrimitives(graph, { type: component.type, quantity: q }, depth + 1)
    )
  }, {})
}

const nearest = (value, multiplier) =>
  Math.ceil(value / multiplier) * multiplier

const computeFuelCost = input => {
  const graph = createGraph(input)
  const primitives = getPrimitives(graph, { type: 'FUEL', quantity: 1 })

  // Round up quantities to the nearest upper batch. For instance, if a
  // component can only be made in batches of 10, and we need 12 of it, return
  // 20 as we can’t make partial batches.
  for (const [key, value] of Object.entries(primitives)) {
    primitives[key] = nearest(value, graph[key].batchSize)
  }

  //console.log(graph, primitives)

  return Object.entries(primitives).reduce((cost, [key, value]) => {
    const { batchSize, components } = graph[key]
    const oreCost = components[0].quantity

    return cost + (value / batchSize) * oreCost
  }, 0)
}

module.exports = { parseLine, createGraph, computeFuelCost }
