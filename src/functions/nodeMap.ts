import { JSONValue } from '../types'

export const nodeMap =
  (func: (a: JSONValue) => JSONValue) =>
  (iterable: JSONValue): JSONValue => {
    return func(iterable)
  }
