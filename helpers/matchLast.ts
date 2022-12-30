// Return the last match of the given regular expression in the given string,
// in the form of an `RegExp.prototype.exec` output.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
const matchLast = (string: string, regex: RegExp): string => {
  let match = null

  while (true) {
    let next = regex.exec(string)
    if (next) match = next
    else break
  }

  return match
}

export default matchLast