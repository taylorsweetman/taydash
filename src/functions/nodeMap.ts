import { isNodeless, JSONValue } from '../types'

export const nodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    if (isNodeless(iterable)) return func(iterable)
    return null
  }
