import $ from '../../helpers'

export const cycle = curr => {
  let next = ''
  let width = Math.sqrt(curr.length)

  for (let i = 0; i < curr.length; i++) {
    const bugs = [
      i - width,
      i % width === width - 1 ? null : i + 1,
      i + width,
      i % width === 0 ? null : i - 1,
    ].filter(i => curr?.[i] === '#').length
    next += (curr[i] === '#' ? bugs === 1 : [1, 2].includes(bugs)) ? '#' : '.'
  }

  return next
}

export const findBiodiversity = input => {
  const history = []
  let curr = input.join('')

  while (!history.includes(curr)) {
    history.push(curr)
    curr = cycle(curr)
  }

  return $.sum(
    curr
      .split('')
      .map((v, i) => (v === '#' ? i : null))
      .filter(value => typeof value === 'number')
      .map(i => Math.pow(2, i))
  )
}
