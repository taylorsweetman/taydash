import { isNodeless, JSONArray, JSONObject, JSONValue } from '../types'
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

export const nodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isNodeless(iterable)) return func(iterable)

    const nodeMapWithAppliedFunction = nodeMap(func)

    if (isArray(iterable))
      return handleArray(nodeMapWithAppliedFunction)(iterable)

    if (isPlainObject(iterable))
      return handleObject(nodeMapWithAppliedFunction)(iterable)

    return null
  }
