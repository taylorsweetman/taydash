export type JSONLeaf = string | number | boolean | null

export type JSONObject = {
  [x: string]: JSONValue
}

export type JSONArray = Array<JSONValue>

export type JSONValue = JSONLeaf | JSONObject | JSONArray

export const isLeaf = (elem: JSONValue): elem is JSONLeaf => {
  if (elem === null) return true
  if (
    typeof elem === 'string' ||
    typeof elem === 'number' ||
    typeof elem === 'boolean'
  )
    return true

  return false
}

export type Maybe<T> = T | null
