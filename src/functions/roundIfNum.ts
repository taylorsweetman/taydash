import { JSONValue, Maybe } from '../types'

/**
 * Rounds a value to a specified number of decimal places, if the input is a number. Returns the value otherwise.
 * decimalPlaces argument must be between 0 and 20, inclusive.
 */
export const roundIfNum =
  (decimalPlaces: number) =>
  (value: JSONValue): Maybe<JSONValue> => {
    if (typeof value !== 'number') return value

    if (decimalPlaces < 0 || decimalPlaces > 20) return null

    const factor = Math.pow(10, decimalPlaces)
    return Math.round(value * factor) / factor
  }

export const _roundIfNum = (decimalPlaces: number, value: JSONValue) =>
  roundIfNum(decimalPlaces)(value)
