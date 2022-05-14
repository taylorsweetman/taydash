export type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray
  | null

export type JSONNodeless = string | number | boolean | null

export const isNodeless = (elem: JSONValue): elem is JSONNodeless => {
  if (elem === null) return true
  if (
    typeof elem === 'string' ||
    typeof elem === 'number' ||
    typeof elem === 'boolean'
  )
    return true

  return false
}

export type JSONObject = {
  [x: string]: JSONValue
}

export type JSONArray = Array<JSONValue>
