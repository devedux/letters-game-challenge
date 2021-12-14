export const add = (a: number) => (b: number) => a + b
export const subs = (a: number) => (b: number) => b - a

export function shuffle(list: Array<any>) {
  return list.sort(() => Math.random() - 0.5)
}
