import $ from '../../helpers'

type Node = {
  children: Node[]
  size: number
  metaSize: number
  meta: Array<number>
  value: number
}

const getValue = (node: Node, withRefs: boolean): number =>
  $.sum(
    node?.meta.map(value =>
      withRefs && node.children.length
        ? getValue(node.children[value - 1], withRefs)
        : value
    ) ?? []
  )

export const parse = (numbers: Array<number>, withRefs: boolean) => {
  const node: Node = {
    children: [],
    size: numbers.shift(),
    metaSize: numbers.shift(),
    meta: null,
    value: null,
  }

  while (node.children.length < node.size)
    node.children.push(parse(numbers, withRefs))

  node.meta = numbers.splice(0, node.metaSize)
  node.value = getValue(node, withRefs)

  return node
}

export const score = ({ children, value }: Node, withRefs: boolean): number =>
  children.reduce(
    (acc: number, child: Node) => acc + score(child, withRefs),
    value
  )
