(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{hH71:function(e,n,t){"use strict";t.r(n),t.d(n,"dayEighteenPartTwo",function(){return r});const r="type PostfixOperationStack = ReturnType<typeof toPostFixNotation>;\nfunction toPostFixNotation(line: string): Array<number | '+' | '*'> {\n  let operandStack: PostfixOperationStack = [];\n  line += ')';\n  let arithmicExpressionStack: Array<'(' | '+' | '*'> = ['('];\n  function peekArithmicExpressionStack(): typeof arithmicExpressionStack[number] {\n    return arithmicExpressionStack[arithmicExpressionStack.length - 1];\n  } \n\n  for(const letter of line) {\n    if(letter === ' ') continue;\n    switch(letter) {\n      case '(': arithmicExpressionStack.push('('); break;\n      case '+':\n        while(peekArithmicExpressionStack() === '+')\n          operandStack.push(arithmicExpressionStack.pop() as '+');\n        arithmicExpressionStack.push('+');\n        break;\n      case '*':\n        while(peekArithmicExpressionStack() !== '(')\n          operandStack.push(arithmicExpressionStack.pop() as Exclude<'(', typeof arithmicExpressionStack[number]>);\n        arithmicExpressionStack.push('*');\n        break;\n      case ')':\n        let entry = arithmicExpressionStack.pop();\n        while(entry && entry !== '(') {\n          operandStack.push(entry);\n          entry = arithmicExpressionStack.pop();\n        }\n        break;\n      default:\n        const number = Number(letter);\n        if(Number.isNaN(number)) throw new Error(`Invalid operator received: ${letter}`);\n        operandStack.push(number);\n        break;\n    }\n  }\n\n  return operandStack;\n}\n\nfunction calculatePostfixResult(stack: PostfixOperationStack): number {\n  let memoryStack = [] as Array<number>;\n  const popSafe = () => {\n    const poppedValue = memoryStack.pop();\n    if(poppedValue === undefined) throw new Error('Attempted to pop a value from the stack but there was no value left!');\n    return poppedValue;\n  }\n  for(const item of stack) {\n    switch(item) {\n      case '*':\n        memoryStack.push(popSafe() * popSafe());\n        break;\n      case '+':\n        memoryStack.push(popSafe() + popSafe());\n        break;\n      default:\n        memoryStack.push(item);\n    }\n  }\n\n  return popSafe();\n}\n\nconst reader = new MyFileReader(input);\nconst operations = reader.readLineByLine(toPostFixNotation);\nconst results = operations.map(calculatePostfixResult);\n\nconst sumOfResults = results.reduce((prev, curr) => prev + curr, 0);\nreturn sumOfResults;"}}]);