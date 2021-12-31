const $ = require('../../helpers')

const split = value => `[${Math.floor(value / 2)},${Math.ceil(value / 2)}]`

const handleExplosions = string => {
  let left = null
  let right = null
  let current = ''
  let openings = []

  for (let i = 0; i < string.length; i++) {
    const char = string[i]

    if (char === '[') {
      openings.push(i)
    } else if (char === ']') {
      let openingIndex = openings.pop()
      right = +current
      current = ''

      // If the closed pair is within 4 pairs or more, it should be exploded.
      if (openings.length >= 4) {
        // The right side you should be added to the first number found on the
        // right of the current pair. To find it, we look for the next number in
        // the string.
        const rightMatch = string.slice(i).match(/\d+/)

        // If we have found one (which is always the case unless dealing with
        // the last pair in the string), we update the string by updating that
        // number with the value of the right side. To do so, we take:
        // 1. Everything up til the index at which the next number is found.
        // 2. The new value (old value + right side).
        // 3. Everything after the next number up to the end of the string.
        if (rightMatch) {
          const value = +rightMatch[0]
          const pivot = i + rightMatch.index
          const start = string.slice(0, pivot)
          const end = string.slice(pivot + String(value).length)

          string = start + (right + value) + end
        }

        // The left side you should be added to the first number found on the
        // left of the current pair. To find it, we look for the first number
        // found before the opening bracket.
        const leftMatch = $.matchLast(string.slice(0, openingIndex), /\d+/g)

        // If we have found one (which is always the case unless dealing with
        // the first pair in the string), we update the string by updating that
        // number with the value of the left side. To do so, we take:
        // 1. Everything up til the index at which the previous number is found.
        // 2. The new value (old value + left side).
        // 3. Everything after the previous number up to the end of the string.
        if (leftMatch) {
          const { value, index } = leftMatch
          const newValue = left + value
          const oldValueLength = String(value).length
          const newValueLength = String(newValue).length

          // If updating the previous number has caused a length shift (by
          // going from a single digit number to a two digits number for
          // instance), update the opening index so the removal the exploded
          // pair is done at the right place.
          if (newValueLength > oldValueLength) {
            openingIndex += newValueLength - oldValueLength
          }

          const start = string.slice(0, index)
          const end = string.slice(index + String(value).length)

          string = start + newValue + end
        }

        // Finally, remove the exploded the string by replacing it with a 0.
        // To do so, take:
        // 1. Everything up to the opening bracket (excluded).
        // 2. A literal 0.
        // 3. Everything after the closing bracket, computed by taking the index
        //    of the opening bracket, the length of the left-side number, the
        //    length of the right side number, and adding 3 for both brackets
        //    and the comma.
        const start = string.slice(0, openingIndex)
        const leftLength = String(left).length
        const rightLength = String(right).length
        const end = string.slice(openingIndex + leftLength + rightLength + 3)

        // Once the explosion has been dealt with, recursively look for next
        // explosions.
        return handleExplosions(start + '0' + end)
      }
    } else if (char === ',') {
      left = +current
      current = ''
    } else {
      current += char
    }
  }

  return string
}

// This function performs under the assumption that no explosion can be done, as
// they have all been resolved already.
const handleLeftMostSplit = string => {
  let left = null
  let right = null
  let current = ''

  for (let i = 0; i < string.length; i++) {
    const char = string[i]

    if (char === ']') {
      right = +current
      current = ''

      // Once the closing bracket is found, check if the right-side value
      // (provided it’s a number of course) is equal to or greater than 10. If
      // it is, split the number and return the updated string. The new string
      // is made of:
      // 1. Everything from the start to the most recent comma.
      // 2. The new pair made from the splitted value.
      // 3. The rest of the string (closing bracket onwards).
      if (right >= 10) {
        const pivot = $.matchLast(string.slice(0, i), /,/g).index + 1
        const start = string.slice(0, pivot)
        const pair = split(right)
        const end = string.slice(i)

        return start + pair + end
      }
    } else if (char === ',') {
      left = +current
      current = ''

      // Once the comma is found, check if the left-side value (provided it’s a
      // number of course) is equal to or greater than 10. If it is, split the
      // number and return the updated string. The new string is made of:
      // 1. Everything from the start to the most recent opening bracket.
      // 2. The new pair made from the splitted value.
      // 3. The rest of the string (closing bracket onwards).
      if (left >= 10) {
        const pivot = $.matchLast(string.slice(0, i), /\[/g).index + 1
        const start = string.slice(0, pivot)
        const pair = split(left)
        const end = string.slice(i)

        return start + pair + end
      }
    } else if (char !== '[') {
      current += char
    }
  }

  return string
}

// The reducing logic is as follow:
// 1. First do all explosions that can be done.
// 2. Once no more explosions can be done, perform the left-most split.
// 3. Repeat step 1 and 2 until the string no longer changes.
const reduce = string => {
  let curr = string

  while (true) {
    let next = handleLeftMostSplit(handleExplosions(curr))
    let done = next === curr
    curr = next
    if (done) break
  }

  return curr
}

const computeMagnitude = ([left, right]) =>
  (typeof left === 'number' ? left : computeMagnitude(left)) * 3 +
  (typeof right === 'number' ? right : computeMagnitude(right)) * 2

const sumFish = (...fishes) =>
  fishes.reduce((acc, fish) => (acc ? reduce(`[${acc},${fish}]`) : fish))

const findHighestMagnitude = (...fishes) => {
  const pairs = $.getCombinations(fishes.slice(0), 2)

  return Math.max(
    ...pairs.map(pair => computeMagnitude(JSON.parse(sumFish(...pair))))
  )
}

module.exports = { reduce, computeMagnitude, sumFish, findHighestMagnitude }
