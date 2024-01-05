import $ from '../../helpers'

export const cycle2 = (input: string, iterations: number = 1) => {
  const offset = +input.slice(0, 7)
  const code = input.split('').map(Number).slice(offset)
  const curr = code.slice()
  const next = new Array<number>(code.length)

  // Solution shamelessly borrowed from Reddit, because I couldn’t figure out
  // how to further optimize my code. It only works for inputs with an offset
  // which is after the half mark of the input string. That’s because at this
  // point, the first half of the patter ends up being only 0s (thus can be
  // safely omitted), and the second half only 1s. Very clever!
  // https://topaz.github.io/paste/#XQAAAQC4BAAAAAAAAAA5GUqKNoFH6q8CASe4lm22gs9yMvBRrw+nF4fHXJ0cvnrh3jdex+Ls1Hrchy3uO0X3khjRBkXIaiSq6xeKJM4F9mdp5URorJLZGppSAOgLD827QzBRbBkjg4XMocuQaouIky73ceySVoT7gfjZXNh7eYt8tTCJ8aGUhDQ0O+TuuHggT8t2fHqie5PMzkbNBYF+DwJPWXd+XkNG7J+nmE+7Eou5KpFmSqxozlb2ug72i/QKUOOaZnrLxup9oOTCPSLWPQxO2OIS56LmWsAp5CKM2kMow2mpintIqHkP7pIbh0U92l53rzJxuN509RkYqNWVRbhtYf21PpqZ+081NS73RdhnwEr/GoDaa2zHT3NWg5MaEdgc8MUBGme/kW6r/CskaeIDFgU9C9aoTR6TkoOknWrWXde2IfRt3toKz+6yTANaETWLhnqtBcnyhvAoE6Js8QXPaz8+Qu2QDNDWOdZLzxIzFt1mmNHwHo8EPNZl4i05XZ5sWdjsDf1hxO4zJY1N2SG7DVp/ZJAHRMJtdAJlp6zjR806gP0HFD5jza+RHKrL8EpPvXGPDzqfKwEdoYSXwXcIZVkGheA+qrBpKtQAETnyiycE9vyRTLfO2h0FwSP1VYy582FZISJe3nCOgkotbxOWR8FBZ2BbaUtQMHikVi96zf/KkZ01
  for (let i = 0; i < iterations; i++) {
    let count = 0

    for (let location = curr.length - 1; location >= 0; location--) {
      count = (count + curr[location]) % 10
      next[location] = count
    }

    for (let location = 0; location < curr.length; location++) {
      curr[location] = next[location]
    }
  }

  return curr.slice(0, 8).join('')
}

const truncate = (value: number) => +value.toString().slice(-1)

const reduceFirst = (acc: number, value: number, i: number) =>
  i % 2 ? acc : acc + value * (i % 4 ? -1 : +1)

const reduceAny = (acc: number, chunk: number[], i: number) =>
  i % 2 ? acc + $.sum(chunk) * (i % 4 === 1 ? +1 : -1) : acc

export const cycle = (input: string, iterations: number = 1) => {
  let curr = input.split('').map(Number)
  let next: number[] = []

  for (let i = 0; i < iterations; i++) {
    for (let d = 0; d < curr.length; d++) {
      if (d === 0) {
        const chunks = curr
        const value = truncate(chunks.reduce(reduceFirst, 0))
        next.push(value)
      } else {
        const chunks = [curr.slice(0, d), ...$.chunk(curr.slice(d), d + 1)]
        const value = truncate(chunks.reduce(reduceAny, 0))
        next.push(value)
      }
    }

    curr = next
    next = []
  }

  return curr.join('')
}
