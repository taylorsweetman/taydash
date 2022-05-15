import { isNodeless, JSONValue } from '../types'
import { isPlainObject, isArray, isEmpty } from 'lodash/fp'

export const nodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isNodeless(iterable)) return func(iterable)

    if (isPlainObject(iterable) && isEmpty(iterable)) return {}
    if (isArray(iterable) && isEmpty(iterable)) return []
    return null
  }
