import $ from '../../helpers'

export const run = (steps: string[], init: string) =>
  steps
    .reduce((acc, step) => {
      if (step.startsWith('reverse')) {
        let [x, y] = step.match(/\d+/g)?.map(Number) ?? []
        while (x < y) $.swap(acc, x++, y--)
        return acc
      }

      if (step.startsWith('rotate based')) {
        const letter = step.at(-1)
        const index = acc.findIndex(l => letter === l)
        return $.rotate(acc, 1 + index + (index >= 4 ? 1 : 0))
      }

      if (step.startsWith('rotate')) {
        const [x] = step.match(/\d+/g)?.map(Number) ?? []
        return $.rotate(acc, x * (step.includes('left') ? -1 : +1))
      }

      if (step.startsWith('swap position')) {
        const [a, b] = step.match(/\d+/g)?.map(Number) ?? []
        return $.swap(acc, a, b)
      }

      if (step.startsWith('swap letter')) {
        const [la, lb] =
          step.match(/letter (\w)/g)?.map(a => a.replace('letter ', '')) ?? []
        const a = acc.findIndex(l => la === l)
        const b = acc.findIndex(l => lb === l)
        return $.swap(acc, a, b)
      }

      if (step.startsWith('move')) {
        const [a, b] = step.match(/\d+/g)?.map(Number) ?? []
        const letter = acc.splice(a, 1).pop()!
        acc.splice(b, 0, letter)
        return acc
      }

      return acc
    }, Array.from(init))
    .join('')

export const run2 = (steps: string[]) =>
  $.permutations(Array.from('abcdefgh'))
    .find(base => run(steps, base.join('')) === 'fbgdceah')
    ?.join('')
