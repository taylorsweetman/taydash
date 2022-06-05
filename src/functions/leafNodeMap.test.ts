import { JSONArray, JSONLeaf, JSONObject, JSONValue } from '../types'
import { identity } from 'lodash/fp'
import { _leafNodeMap, leafNodeMap } from './leafNodeMap'

describe('leafNodeMap', () => {
  describe('with identity function', () => {
    const leafNodeMapIdentityFunc = leafNodeMap(identity)

    it.each([
      [1, 1],
      [true, true],
      ['hi', 'hi'],
      [null, null],
    ])(
      'should apply function on leaf iterables correctly: %s -> %s',
      (iter: JSONLeaf, expected: JSONLeaf) => {
        expect(leafNodeMapIdentityFunc(iter)).toBe(expected)
        expect(_leafNodeMap(identity, iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(leafNodeMapIdentityFunc(iter)).toEqual(expected)
        expect(_leafNodeMap(identity, iter)).toEqual(expected)
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
        expect(_leafNodeMap(identity, iter)).toEqual(expected)
      }
    )
  })

  describe('with to one function', () => {
    const toOne = () => 1
    const leafNodeMapWithToOne = leafNodeMap(toOne)

    it.each([
      [1, 1],
      [true, 1],
      ['hi', 1],
      [null, 1],
    ])(
      'should apply function on leaf iterables correctly: %s -> %s',
      (iter: JSONLeaf, expected: JSONLeaf) => {
        expect(leafNodeMapWithToOne(iter)).toBe(expected)
        expect(_leafNodeMap(toOne, iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(leafNodeMapWithToOne(iter)).toEqual(expected)
        expect(_leafNodeMap(toOne, iter)).toEqual(expected)
      }
    )

    it.each([
      [{ hello: { world: [true, 1, 'a'] } }, { hello: { world: [1, 1, 1] } }],
      [
        [{ hello: { world: true } }, 'hi'],
        [{ hello: { world: 1 } }, 1],
      ],
    ])(
      'should correctly use applied functions on deeply nested JSONValue: %j -> %j',
      (iter: JSONValue, expected: JSONValue) => {
        expect(leafNodeMapWithToOne(iter)).toEqual(expected)
        expect(_leafNodeMap(toOne, iter)).toEqual(expected)
      }
    )
  })
})
