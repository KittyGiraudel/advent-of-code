import $ from '../../helpers'

const getValue = (node, withRefs) =>
  $.sum(
    node?.meta.map(value =>
      withRefs && node.children.length
        ? getValue(node.children[value - 1], withRefs)
        : value
    ) ?? []
  )

export const parse = (numbers, withRefs) => {
  const node = {
    children: [],
    size: numbers.shift(),
    metaSize: numbers.shift(),
  }

  while (node.children.length < node.size)
    node.children.push(parse(numbers, withRefs))

  node.meta = numbers.splice(0, node.metaSize)
  node.value = getValue(node, withRefs)

  return node
}

export const score = ({ children, value }, withRefs) =>
  children.reduce((acc, child) => acc + score(child, withRefs), value)
