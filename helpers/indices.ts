const indices = (string: string, from: string) => {
  const indices = []
  const regex = new RegExp(from, 'g')

  let result
  while ((result = regex.exec(string))) indices.push(result.index)

  return indices
}

export default indices
