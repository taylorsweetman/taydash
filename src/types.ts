export type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray
  | null

export type JSONObject = {
  [x: string]: JSONValue
}

export type JSONArray = Array<JSONValue>
