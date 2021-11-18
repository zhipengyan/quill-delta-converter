import deepEqual from 'deep-equal'

export const fuzzyEqual = (str1: string, str2: string) => {
  if (str1.trim().length !== str2.trim().length) {
    return false
  }
  const reduceFn = (rt: Record<string, number>, char: string) => {
    rt[char] = (rt[char] ?? 0) + 1
    return rt
  }

  const obj1 = str1.split('').reduce(reduceFn, {})
  const obj2 = str1.split('').reduce(reduceFn, {})

  return deepEqual(obj1, obj2)
}
