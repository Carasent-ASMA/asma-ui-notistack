export const omit = <T extends object, const K extends readonly (keyof T)[]>(obj: T, keys: K): Omit<T, K[number]> =>
    Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K[number]))) as Omit<T, K[number]>
