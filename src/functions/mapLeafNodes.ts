import { isLeaf, JSONArray, JSONObject, JSONValue } from '../types'
import { isPlainObject, isArray, entries, pipe, reduce, map } from 'lodash/fp'

const mapArray =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONArray): JSONArray =>
    map(mapLeafNodes(func))(iterable)

const mapObject =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONObject): JSONObject =>
    pipe(
      entries,
      reduce(
        (accum, [key, val]) => ({ ...accum, [key]: mapLeafNodes(func)(val) }),
        {} as JSONObject
      )
    )(iterable)

export const mapLeafNodes =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isLeaf(iterable)) return func(iterable)

    if (isArray(iterable)) return mapArray(func)(iterable)

    if (isPlainObject(iterable)) return mapObject(func)(iterable)

    return null
  }

export const _mapLeafNodes = (
  func: (a: JSONValue) => JSONValue,
  iterable: JSONValue
): JSONValue => mapLeafNodes(func)(iterable)
