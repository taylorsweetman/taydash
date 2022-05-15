import { nodeMap } from './nodeMap'

test('identity function works with nodeless iterables', () => {
  const nodeMapIdentityFunc = nodeMap((x) => x)

  expect(nodeMapIdentityFunc(1)).toBe(1)
  expect(nodeMapIdentityFunc(true)).toBe(true)
  expect(nodeMapIdentityFunc('hi')).toBe('hi')
  expect(nodeMapIdentityFunc(null)).toBe(null)
  expect(nodeMapIdentityFunc({})).toEqual({})
  expect(nodeMapIdentityFunc([])).toEqual([])
})
