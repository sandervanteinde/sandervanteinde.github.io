(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"1P5w":function(n,t,o){"use strict";o.r(t),o.d(t,"dayTenPartTwo",function(){return e});const e="const fileReader = new MyFileReader(input);\nconst jolts = fileReader.readLineByLine(Number);\n\njolts.sort((left, right) => left - right);\n// Add the charing outlet\njolts.unshift(0);\n// add the device jolt\njolts.push(jolts[jolts.length - 1] + 3);\n\nconst amountOfOptionsFromIndex = new Map<number, number>();\n\nfor (let i = jolts.length - 1; i >= 0; i--) {\n  const iValue = jolts[i];\n  let optionCount = 0;\n  for (let j = i + 1; j < jolts.length; j++) {\n    const jValue = jolts[j];\n    if (jValue - iValue > 3) break;\n    const existingOptions = amountOfOptionsFromIndex.get(j);\n    if (existingOptions) optionCount += existingOptions;\n    else optionCount++;\n  }\n  amountOfOptionsFromIndex.set(i, optionCount);\n}\n\nreturn amountOfOptionsFromIndex.get(0)!;"}}]);