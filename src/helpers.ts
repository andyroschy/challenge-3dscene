export function arrayBounds(arr: number[]): [number, number] {
  if (!arr.length) return [0, 0];
  return arr.reduce(([min, max], curr) => [Math.min(min, curr), Math.max(max, curr)], [arr[0], arr[0]])
}