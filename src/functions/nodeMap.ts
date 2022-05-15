import { isNodeless, JSONObject, JSONValue } from '../types'
import { isPlainObject, isArray } from 'lodash/fp'

export const nodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isNodeless(iterable)) return func(iterable)

    const mapWithAppliedFunc = nodeMap(func)

    if (isPlainObject(iterable)) {
      return Object.entries(iterable).reduce((accum, [key, val]) => {
        accum[key] = mapWithAppliedFunc(val)
        return { ...accum, [key]: mapWithAppliedFunc(val) }
      }, {} as JSONObject)
    }

    if (isArray(iterable)) {
      return iterable.map((val) => mapWithAppliedFunc(val))
    }

    return null
  }
