const matchLast = (string, regex) => {
  let match

  while (true) {
    let next = regex.exec(string)
    if (next) match = next
    else break
  }

  return match ? { value: +match[0], index: match.index } : null
}

module.exports = matchLast
