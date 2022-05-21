# Taydash

[![GitHub Actions CI](https://github.com/taylorsweetman/taydash/workflows/CI/badge.svg?branch=main)](https://github.com/taylorsweetman/taydash/actions)
[![npm version](https://badge.fury.io/js/taydash.svg)](https://www.npmjs.com/package/taydash)

## Description

A collection of utility functions and types which have proved useful, and are lacking from other utility libraries. Strives to maintain functional programming best practises where possible.

## Usage

```shell
npm i taydash
```

## Bestiary

### [leafNodeMap](https://github.com/taylorsweetman/taydash/blob/main/src/functions/leafNodeMap.ts)

- Curried function which iterates over a `JSONValue` (JSON style object, array, or primitive) and applies a passed function to each leaf node of the value.

```typescript
const addOne = (num) => num + 1
const result = leafNodeMap(addOne)({ num: 0, arr: [1, 2, 3] })
console.log(result)
// { num: 1, arr: [ 2, 3, 4 ] }
```
