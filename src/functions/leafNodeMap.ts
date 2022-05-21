import { isLeaf, JSONArray, JSONObject, JSONValue } from '../types'
import { isPlainObject, isArray, entries, pipe, reduce, map } from 'lodash/fp'

const handleArray =
  (mapWithAppliedFunc: (a: JSONValue) => JSONValue) =>
  (iterable: JSONArray): JSONArray =>
    map(mapWithAppliedFunc)(iterable)

const handleObject =
  (mapWithAppliedFunc: (a: JSONValue) => JSONValue) =>
  (iterable: JSONObject): JSONObject =>
    pipe(
      entries,
      reduce(
        (accum, [key, val]) => ({ ...accum, [key]: mapWithAppliedFunc(val) }),
        {} as JSONObject
      )
    )(iterable)

export const leafNodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isLeaf(iterable)) return func(iterable)

    const leafNodeMapWithAppliedFunction = leafNodeMap(func)

    if (isArray(iterable))
      return handleArray(leafNodeMapWithAppliedFunction)(iterable)

    if (isPlainObject(iterable))
      return handleObject(leafNodeMapWithAppliedFunction)(iterable)

    return null
  }
