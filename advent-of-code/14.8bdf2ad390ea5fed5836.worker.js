self.webpackChunk([14],{a4Dd:function(n,e,r){"use strict";r.r(e),r.d(e,"dayFifteenPartTwo",function(){return s});const s="const numbers = input.split(',').map(Number);\nconst numbersSpoken = new Map<number, Array<number>>();\n\nfunction getOrAdd(numberSpoken: number, newIndex: number): void {\n  const existing = numbersSpoken.get(numberSpoken);\n  if(!existing) numbersSpoken.set(numberSpoken, [newIndex]);\n  else existing.push(newIndex);\n}\nlet previous: number = -1;\nfor(let i = 0; i < 30000000; i++) {\n  if(i < numbers.length) {\n    // start number\n    previous = numbers[i];\n    getOrAdd(previous, i);\n  } else {\n    const previousValue = numbersSpoken.get(previous)!;\n    if(previousValue.length === 1) {\n      previous = 0;\n      getOrAdd(0, i);\n    } else {\n      const [secondLast, last] = previousValue.slice(previousValue.length - 2);\n      const numberSpoken = last - secondLast;\n      getOrAdd(numberSpoken, i);\n      previous = numberSpoken;\n    }\n  }\n}\nreturn previous;"}});