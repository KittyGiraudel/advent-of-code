export const run = (input: number) => {
  let elf = 0
  let housesA: number[] = []
  let housesB: number[] = []
  let results: number[] = []

  while (++elf) {
    for (let house = elf; house <= input; house += elf) {
      housesA[house] = (housesA[house] || 0) + elf * 10
      if (house <= elf * 50) housesB[house] = (housesB[house] || 0) + elf * 11
    }

    if (!results[0] && housesA[elf] >= input) results[0] = elf
    if (!results[1] && housesB[elf] >= input) results[1] = elf
    if (results[0] && results[1]) return results
  }
}
