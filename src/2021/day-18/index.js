const parseLine = line => (Array.isArray(line) ? line : JSON.parse(line))
const split = value => [Math.floor(value / 2), Math.ceil(value / 2)]
const isNumber = value => typeof value === 'number'
const isPair = value => Array.isArray(value)

const findPrevNumber = layer =>
  isNumber(layer[1]) ? { layer, index: 1 } : findPrevNumber(layer[1])

const findNextNumber = layer =>
  isNumber(layer[0]) ? { layer, index: 0 } : findNextNumber(layer[0])

const handleLeftExplosion = (layers, fish) => {
  const layer = layers.pop()
  if (!layer) return null

  if (Object.is(layer[1], fish)) {
    return isNumber(layer[0]) ? { layer, index: 0 } : findPrevNumber(layer[0])
  }

  return handleLeftExplosion(layers, layer)
}

const handleRightExplosion = (layers, fish) => {
  const layer = layers.pop()
  if (!layer) return null

  if (Object.is(layer[0], fish)) {
    return isNumber(layer[1]) ? { layer, index: 1 } : findNextNumber(layer[1])
  }

  return handleRightExplosion(layers, layer)
}

const explode = (fish, parents) => {
  console.log('Explode', fish)
  const parent = parents[parents.length - 1]
  const indexOfFishInParent = parent.indexOf(fish)
  if (indexOfFishInParent === -1) return false

  // Handle explosion
  const eLeft = handleLeftExplosion([...parents], fish)
  if (eLeft) eLeft.layer[eLeft.index] += fish[0]
  const eRight = handleRightExplosion([...parents], fish)
  if (eRight) eRight.layer[eRight.index] += fish[1]

  // Replace
  parent[indexOfFishInParent] = 0
  return true
}

const reduce = (fish, parents = []) => {
  while (true) {
    if (parents.length >= 4 && fish.every(isNumber)) {
      if (explode(fish, parents)) continue
    }

    const splitIndex = fish.findIndex(item => isNumber(item) && item >= 10)
    if (splitIndex > -1) {
      fish[splitIndex] = split(fish[splitIndex])
      continue
    }
    break
  }

  fish.forEach((item, index, array) => {
    if (isPair(item)) reduce(array[index], [...parents, array])
  })

  return fish
}

const computeMagnitude = ([left, right]) =>
  (isNumber(left) ? left : computeMagnitude(left)) * 3 +
  (isNumber(right) ? right : computeMagnitude(right)) * 2

/*
const parseLine = line => (Array.isArray(line) ? line : JSON.parse(line))
const isNumber = value => typeof value === 'number'
const isPair = value => Array.isArray(value)

const findPrevNumber = layer =>
  isNumber(layer[1]) ? { layer, index: 1 } : findPrevNumber(layer[1])

const findNextNumber = layer =>
  isNumber(layer[0]) ? { layer, index: 0 } : findNextNumber(layer[0])

const handleLeftExplosion = (layers, fish) => {
  const layer = layers.pop()
  if (!layer) return null

  // If the exploding pair is on the right side of its own pair, check if the
  // left side is a number. If it is, that’s the incremented one, otherwise
  // dig into the left side pair to find the first number.
  if (Object.is(layer[1], fish)) {
    return isNumber(layer[0]) ? { layer, index: 0 } : findPrevNumber(layer[0])
  }

  return handleLeftExplosion(layers, layer)
}

// Find the left-most number value on the right of the current pair. Return the
// array to modify, and the position in that array.
const handleRightExplosion = (layers, fish) => {
  const layer = layers.pop()
  if (!layer) return null

  // If the exploding pair is on the left side of its own pair, check if the
  // right side is a number. If it is, that’s the incremented one, otherwise
  // dig into the right side pair to find the first number.
  if (Object.is(layer[0], fish)) {
    return isNumber(layer[1]) ? { layer, index: 1 } : findNextNumber(layer[1])
  }

  // If the exploding pair sits on the right side of its own pair though, we
  // need to go one layer up.
  return handleRightExplosion(layers, layer)
}

const split = value => [Math.floor(value / 2), Math.ceil(value / 2)]

const reduce = (pair, layers = []) => {
  const [left, right] = pair

  // If we are 4 layers deep and the pair is made solely of numeric values, it
  // should be exploded.
  if (layers.length >= 4 && pair.every(isNumber)) {
    // Update left-most and right-most numeric value with the ones from the
    // exploded pair.
    const eLeft = handleLeftExplosion([...layers], pair)
    if (eLeft) eLeft.layer[eLeft.index] += left
    const eRight = handleRightExplosion([...layers], pair)
    if (eRight) eRight.layer[eRight.index] += right

    // Replace the pair with a 0.
    const lastLayer = layers.pop()
    const index = lastLayer.indexOf(pair)
    lastLayer[index] = 0

    // Once the pair has been exploded, its parent should be reduced again
    // because it might need another pass.
    return reduce(layers.pop(), layers)
  }

  // If the left side of the current pair is a number and is above 10, it should
  // be split.
  if (isNumber(left) && left >= 10) {
    pair[0] = split(left)
    // Once the value has been split, its parent should be reduced again because
    // it might need another pass.
    return reduce(layers.pop(), layers)
  }
  // If the left side of the current pair is a number and is above 10, it should
  // be split.
  else if (isNumber(right) && right >= 10) {
    pair[1] = split(right)
    // Once the value has been split, its parent should be reduced again because
    // it might need another pass.
    return reduce(layers.pop(), layers)
  }

  // Once the pair has been reduced, its children pairs need to be reduced as
  // well. We push the current pair into the layer stack.
  if (isPair(pair[0])) reduce(pair[0], [...layers, pair])
  if (isPair(pair[1])) reduce(pair[1], [...layers, pair])

  return pair
}

*/

const sumFish = fishes =>
  fishes
    .map(parseLine)
    .reduce((acc, fish) => (acc ? reduce([acc, fish]) : fish))

module.exports = {
  parseLine,
  reduce,
  sumFish,
  computeMagnitude,
}
