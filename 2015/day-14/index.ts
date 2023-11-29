class Deer {
  name: string
  velocity: number
  flyingTime: number
  restingTime: number
  state: 'FLYING' | 'RESTING'
  distance: number
  current: number
  score: number

  constructor(line: string) {
    const [, name, km, s, rest] = line.match(/(\w+).*?(\d+).*?(\d+).*?(\d+)/)

    this.name = name
    this.velocity = +km
    this.flyingTime = +s
    this.restingTime = +rest

    this.state = 'FLYING'
    this.distance = 0
    this.current = 0
    this.score = 0
  }

  switch(state: 'FLYING' | 'RESTING') {
    this.state = state
    this.current = 0
  }

  tick() {
    this.current++

    if (this.state === 'FLYING') {
      this.distance += this.velocity

      if (this.current === this.flyingTime) {
        return this.switch('RESTING')
      }
    }

    if (this.state === 'RESTING' && this.current === this.restingTime) {
      return this.switch('FLYING')
    }
  }
}

export const run = (
  input: string[],
  iterations: number = 1000
): [number, number] => {
  const deers = input.map(line => new Deer(line))

  for (let i = 0; i < iterations; i++) {
    deers.forEach(deer => deer.tick())
    deers.sort((a, b) => b.distance - a.distance)

    let max = deers[0].distance

    for (let i = 0; i < deers.length; i++) {
      if (deers[i].distance < max) break
      else deers[i].score++
    }
  }

  return [
    Math.max(...deers.map(deer => deer.distance)),
    Math.max(...deers.map(deer => deer.score)),
  ]
}
