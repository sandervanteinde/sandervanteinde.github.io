self.webpackChunk([34],{Scta:function(n,e,t){"use strict";t.r(e),t.d(e,"dayElevenPartTwo",function(){return r});const r="const fileReader = new MyFileReader('./inputs/day11.txt');\nlet grid = fileReader.readAsTwoDimensionalArray((val) => val as '.' | 'L' | '#');\n\nfunction occupiedSeatsNextTo(i: number, j: number): number {\n  let counter = 0;\n  for (let deltaI = -1; deltaI <= 1; deltaI++) {\n    const currentI = i + deltaI;\n    if (currentI < 0 || currentI >= grid.length) continue;\n    const currentRow = grid[currentI];\n\n    for (let deltaJ = -1; deltaJ <= 1; deltaJ++) {\n      if (deltaI === 0 && deltaJ === 0) continue;\n      const currentJ = j + deltaJ;\n      if (currentJ < 0 || currentJ >= grid.length) continue;\n      const currentEntry = currentRow[currentJ];\n      if (currentEntry === '#') counter++;\n    }\n  }\n  if (counter > 8) throw new Error('Invalid count');\n  return counter;\n}\n\nfunction printGrid() {\n  console.log('Current grid');\n  for (let i = 0; i < grid.length; i++) {\n    console.log(grid[i].join(''));\n  }\n  console.log('------------');\n}\nlet amountOfMutations = 0;\ndo {\n  const newGrid: typeof grid = [];\n  amountOfMutations = 0;\n  for (let i = 0; i < grid.length; i++) {\n    const row = grid[i];\n    const newRow = [] as typeof grid[number];\n    newGrid.push(newRow);\n    for (let j = 0; j < row.length; j++) {\n      const entry = row[j];\n      switch (entry) {\n        case '.':\n          newRow.push('.');\n          break;\n        case 'L':\n          if (occupiedSeatsNextTo(i, j) === 0) {\n            amountOfMutations++;\n            newRow.push('#');\n          } else {\n            newRow.push('L');\n          }\n          break;\n        case '#':\n          if (occupiedSeatsNextTo(i, j) >= 4) {\n            newRow.push('L');\n            amountOfMutations++;\n          } else {\n            newRow.push('#');\n          }\n          break;\n      }\n    }\n  }\n  if (\n    newGrid.length !== grid.length ||\n    !newGrid.every((entry, index) => entry.length === grid[index].length)\n  ) {\n    throw new Error('New grid is not equal to grid');\n  }\n  grid = newGrid;\n  printGrid();\n} while (amountOfMutations > 0);\n\nconst occupiedSeats = grid.reduce(\n  (prev, next) =>\n    prev +\n    next.reduce(\n      (innerPrev, innerNext) => innerPrev + (innerNext === '#' ? 1 : 0),\n      0\n    ),\n  0\n);\nreturn occupiedSeats;"}});