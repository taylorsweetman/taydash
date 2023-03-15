import { roundIfNum, _roundIfNum } from '../src/functions/roundIfNum'

describe('roundIfNum', () => {
  it.each([
    [1, 1],
    [1.011, 1.01],
    [1.145, 1.15],
    [1.29999999, 1.3],
  ])(
    'should round numbers to two decimal places: %d -> %d',
    (val, expected) => {
      expect(roundIfNum(2)(val)).toBe(expected)
      expect(_roundIfNum(2, val)).toBe(expected)
    }
  )
  it.each([
    [1.123456, 1.12346],
    [1.123454, 1.12345],
    [1.001, 1.001],
  ])(
    'should round numbers to five decimal places: %d -> %d',
    (val, expected) => {
      expect(roundIfNum(5)(val)).toBe(expected)
      expect(_roundIfNum(5, val)).toBe(expected)
    }
  )
  it.each([
    [1.001, 1],
    [2, 2],
  ])(
    'should round numbers to zero decimal places: %d -> %d',
    (val, expected) => {
      expect(roundIfNum(0)(val)).toBe(expected)
      expect(_roundIfNum(0, val)).toBe(expected)
    }
  )
  it.each([
    ['hi', 'hi'],
    [{}, {}],
    [[], []],
    [true, true],
  ])('should return value if not a number: %s -> %s', (val, expected) => {
    expect(roundIfNum(2)(val)).toStrictEqual(expected)
    expect(_roundIfNum(2, val)).toStrictEqual(expected)
  })
  it('return null when less than 0 decimalPlaces provided', () => {
    expect(roundIfNum(-1)(1)).toBeNull()
    expect(_roundIfNum(-1, 1)).toBeNull()
  })
  it('return null when more than 20 decimalPlaces provided', () => {
    expect(roundIfNum(100)(1)).toBeNull()
    expect(_roundIfNum(100, 1)).toBeNull()
  })
})
