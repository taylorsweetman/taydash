import { JSONArray, JSONNodeless, JSONObject, JSONValue } from '../types'
import { leafNodeMap } from './leafNodeMap'

describe('leafNodeMap', () => {
  describe('with identity function', () => {
    const leafNodeMapIdentityFunc = leafNodeMap((x) => x)

    it.each([
      [1, 1],
      [true, true],
      ['hi', 'hi'],
      [null, null],
    ])(
      'should apply function on nodeless iterables correctly: %s -> %s',
      (iter: JSONNodeless, expected: JSONNodeless) => {
        expect(leafNodeMapIdentityFunc(iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(leafNodeMapIdentityFunc(iter)).toEqual(expected)
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
        expect(leafNodeMapIdentityFunc(iter)).toEqual(expected)
      }
    )
  })

  describe('with to one function', () => {
    const leafNodeMapWithToOne = leafNodeMap(() => 1)

    it.each([
      [1, 1],
      [true, 1],
      ['hi', 1],
      [null, 1],
    ])(
      'should apply function on nodeless iterables correctly: %s -> %s',
      (iter: JSONNodeless, expected: JSONNodeless) => {
        expect(leafNodeMapWithToOne(iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(leafNodeMapWithToOne(iter)).toEqual(expected)
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
        expect(leafNodeMapWithToOne(iter)).toEqual(expected)
      }
    )
  })
})
