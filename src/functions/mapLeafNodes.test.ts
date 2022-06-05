import { JSONArray, JSONLeaf, JSONObject, JSONValue } from '../types'
import { identity } from 'lodash/fp'
import { _mapLeafNodes, mapLeafNodes } from './mapLeafNodes'

describe('mapLeafNodes', () => {
  describe('with identity function', () => {
    it.each([
      [1, 1],
      [true, true],
      ['hi', 'hi'],
      [null, null],
    ])(
      'should apply function on leaf iterables correctly: %s -> %s',
      (iter: JSONLeaf, expected: JSONLeaf) => {
        expect(mapLeafNodes(identity)(iter)).toBe(expected)
        expect(_mapLeafNodes(identity, iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(mapLeafNodes(identity)(iter)).toEqual(expected)
        expect(_mapLeafNodes(identity, iter)).toEqual(expected)
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
        expect(mapLeafNodes(identity)(iter)).toEqual(expected)
        expect(_mapLeafNodes(identity, iter)).toEqual(expected)
      }
    )
  })

  describe('with to one function', () => {
    const toOne = () => 1

    it.each([
      [1, 1],
      [true, 1],
      ['hi', 1],
      [null, 1],
    ])(
      'should apply function on leaf iterables correctly: %s -> %s',
      (iter: JSONLeaf, expected: JSONLeaf) => {
        expect(mapLeafNodes(toOne)(iter)).toBe(expected)
        expect(_mapLeafNodes(toOne, iter)).toBe(expected)
      }
    )

    it.each([
      [{}, {}],
      [[], []],
    ])(
      'should return empty object or list when receiving empty object or list: %s -> %s',
      (iter: JSONObject | JSONArray, expected: JSONObject | JSONArray) => {
        expect(mapLeafNodes(toOne)(iter)).toEqual(expected)
        expect(_mapLeafNodes(toOne, iter)).toEqual(expected)
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
        expect(mapLeafNodes(toOne)(iter)).toEqual(expected)
        expect(_mapLeafNodes(toOne, iter)).toEqual(expected)
      }
    )
  })
})
