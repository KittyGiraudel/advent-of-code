const keys = <T extends string>(obj: Record<string, unknown>) =>
  Object.keys(obj) as T[]

export default keys
