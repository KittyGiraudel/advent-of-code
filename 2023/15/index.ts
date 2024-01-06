import $ from '../../helpers'

const hash = (input: string) => {
  let value = 0

  for (let i = 0; i < input.length; i++) {
    value += input.charCodeAt(i)
    value *= 17
    value %= 256
  }

  return value
}

type Lens = { type: '=' | '-'; label: string; id: number; value: number }

const parse = (input: string) => {
  const [label, type, rest] = input.split(/([=-])/)
  const id = hash(label)
  const value = rest ? +rest : Infinity
  return { type, label, id, value } as Lens
}

export const run = (input: string[], part2: boolean = false) => {
  if (!part2) {
    return $.sum(input.map(hash))
  }

  const boxes = new Map<number, Lens[]>()

  input.map(parse).forEach(lens => {
    if (!boxes.has(lens.id)) boxes.set(lens.id, [])

    const box = boxes.get(lens.id)
    if (!box) throw new Error('Could not find box with ID ' + lens.id)

    const index = box.findIndex(({ label }) => lens.label === label)
    const newIndex = index > -1 ? index : box.length

    // My first version was a bit more verbose so I golfed it a bit for funsies.
    // The gist is that we remove the lens if it’s already in there, and if it’s
    // an = lens, we insert it at the right position (where the removed lens was
    // or at the end otherwise).
    if (index > -1) box.splice(index, 1)
    if (lens.type === '=') box.splice(newIndex, 0, lens)
  })

  return $.sum(
    Array.from(boxes.values()).flatMap(lenses =>
      lenses.map(({ id, value }, index) => (1 + id) * (1 + index) * value)
    )
  )
}
