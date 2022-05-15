import { JSONArray, JSONNodeless, JSONObject } from '../types'
import { nodeMap } from './nodeMap'

describe('nodeMap', () => {
  const nodeMapIdentityFunc = nodeMap((x) => x)

  it.each([
    [1, 1],
    [true, true],
    ['hi', 'hi'],
    [null, null],
  ])(
    'should use identity function on nodeless iterables correctly: %s -> %s',
    (iter: JSONNodeless, expected: JSONNodeless) => {
      expect(nodeMapIdentityFunc(iter)).toBe(expected)
    }
  )

  it.each([
    [{}, {}],
    [[], []],
  ])(
    'should return empty object or list when receiving empty object or list: %s -> %s',
    (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
      expect(nodeMapIdentityFunc(iter)).toEqual(expected)
    }
  )
})
