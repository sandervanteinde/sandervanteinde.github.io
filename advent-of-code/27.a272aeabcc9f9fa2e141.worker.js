self.webpackChunk([27],{xdmF:function(n,e,r){"use strict";r.r(e),r.d(e,"dayFivePartTwo",function(){return t});const t="const fileReader = new MyFileReader(input);\nconst parsed = fileReader.readLineByLine((line) => {\n  const ftb = line.substr(0, 7);\n  const ltr = line.substr(7);\n  return {\n    ftb: ftb.split('') as Array<'F' | 'B'>,\n    ltr: ltr.split('') as Array<'L' | 'R'>,\n  };\n});\n\nfunction reduce<TUpper, TLower>(\n  value: Array<TUpper | TLower>,\n  upper: TUpper,\n  lower: TLower,\n  range: [number, number]\n): number {\n  if (range[0] === range[1]) return range[0];\n  if (value.length === 0) throw new Error('Whoopsie, coding error');\n  const currentVal = value.pop();\n  const diff = range[1] - range[0];\n  const middle = Math.floor(diff / 2);\n  if (currentVal === upper) {\n    return reduce(value, upper, lower, [range[0], range[1] - middle - 1]);\n  } else {\n    return reduce(value, upper, lower, [range[0] + middle + 1, range[1]]);\n  }\n}\n\nconst asRowAndColumn = parsed.map(({ ftb, ltr }) => {\n  const row = reduce([...ftb.reverse()], 'F', 'B', [0, 127]);\n  const column = reduce([...ltr.reverse()], 'L', 'R', [0, 7]);\n  return { row, column };\n});\nconst heighestId = asRowAndColumn.reduce(\n  (prev, { row, column }) => {\n    const id = row * 8 + column;\n    prev.ids.push(id);\n    return {\n      max: Math.max(prev.max, id),\n      min: Math.min(prev.min, id),\n      ids: prev.ids,\n    };\n  },\n  {\n    max: Number.MIN_VALUE,\n    min: Number.MAX_VALUE,\n    ids: [] as Array<number>,\n  }\n);\nfor (let i = heighestId.min; i <= heighestId.max; i++) {\n  if (heighestId.ids.includes(i)) continue;\n  return i;\n}\nthrow new Error('Match not found');"}});