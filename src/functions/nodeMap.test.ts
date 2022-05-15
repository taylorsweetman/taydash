import { JSONArray, JSONNodeless, JSONObject, JSONValue } from '../types'
import { nodeMap } from './nodeMap'

describe('nodeMap', () => {
  describe('with identity function', () => {
    const nodeMapIdentityFunc = nodeMap((x) => x)

    it.each([
      [1, 1],
      [true, true],
      ['hi', 'hi'],
      [null, null],
    ])(
      'should apply function on nodeless iterables correctly: %s -> %s',
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

    it.each([
      [
        { hello: { world: [true, 1, 'a'] } },
        { hello: { world: [true, 1, 'a'] } },
      ],
      [
        [{ hello: { world: true } }, 1],
        [{ hello: { world: true } }, 1],
      ],
    ])(
      'should correctly use applied functions on deeply nested JSONValue: %j -> %j',
      (iter: JSONValue, expected: JSONValue) => {
        expect(nodeMapIdentityFunc(iter)).toEqual(expected)
      }
    )
  })

  describe('with to one function', () => {
    const nodeMapIdentityFunc = nodeMap((_) => 1)

    it.each([
      [1, 1],
      [true, 1],
      ['hi', 1],
      [null, 1],
    ])(
      'should apply function on nodeless iterables correctly: %s -> %s',
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

    it.each([
      [{ hello: { world: [true, 1, 'a'] } }, { hello: { world: [1, 1, 1] } }],
      [
        [{ hello: { world: true } }, 1],
        [{ hello: { world: 1 } }, 1],
      ],
    ])(
      'should correctly use applied functions on deeply nested JSONValue: %j -> %j',
      (iter: JSONValue, expected: JSONValue) => {
        expect(nodeMapIdentityFunc(iter)).toEqual(expected)
      }
    )
  })
})
