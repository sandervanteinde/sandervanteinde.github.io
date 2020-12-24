(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Jq9m:function(t,n,e){"use strict";e.r(n),e.d(n,"dayEighteenPartOne",function(){return r});const r="type PostfixOperationStack = ReturnType<typeof toPostFixNotation>;\nfunction toPostFixNotation(line: string): Array<number | '+' | '*'> {\n  let operationStack: PostfixOperationStack = [];\n  interface State { read(char: string): State; }\n\n  class OpenBracketState {\n    // internal state of the inner side of the brackets\n    state: State = new NullState();\n    constructor(readonly afterBracketOps: PostfixOperationStack) { }\n    read(char: string): State {\n      if(this.state instanceof OpenBracketState) {\n        this.state = this.state.read(char);\n        return this;\n      }\n      if(char === ')') {\n        operationStack.push(...this.afterBracketOps);\n        return new NullState();\n      } else {\n        this.state = this.state.read(char);\n      }\n      return this;\n    }\n  }\n\n  class OperationState {\n    constructor(readonly operation: '+' | '*', readonly left?: number) { }\n\n    read(char: string): State {\n      const charCode = char.charCodeAt(0);\n      if(charCode >= 48 && charCode <= 57) {\n        if(this.left) operationStack.push(this.left);\n        operationStack.push(Number(char));\n        operationStack.push(this.operation);\n        return new NullState();\n      } else if(char === '(') {\n        return new OpenBracketState(this.left ? [this.left, this.operation] : [this.operation]);\n      }\n      throw new Error(`Unknown operation in state ${this.constructor.name}`);\n    }\n  }\n\n  class LeftNumberState {\n    constructor(readonly left: number) { }\n\n    read(char: string): State {\n      switch(char) {\n        case '+':\n        case '*':\n          return new OperationState(char, this.left);\n        default:\n          throw new Error(`Unknown operation in state ${this.constructor.name}`);\n      }\n    }\n  }\n\n  class NullState {\n    read(char: string): State {\n      const charCode = char.charCodeAt(0);\n      if(charCode >= 48 && charCode <= 57) {\n        return new LeftNumberState(Number(char));\n      } else if(char === '(') {\n        return new OpenBracketState([]);\n      } else if(char === '*' || char === '+') {\n        return new OperationState(char);\n      } else\n        throw new Error(`Unknown operation [${char}] in state ${this.constructor.name}`);\n\n    }\n  }\n\n  let state: State = new NullState();\n  for(const letter of line){\n    if(letter === ' ') continue;\n    state = state.read(letter);\n  }\n\n  return operationStack;\n}\n\nfunction calculatePostfixResult(stack: PostfixOperationStack): number {\n  let memoryStack = [] as Array<number>;\n  const popSafe = () => {\n    const poppedValue = memoryStack.pop();\n    if(poppedValue === undefined) throw new Error('Attempted to pop a value from the stack but there was no value left!');\n    return poppedValue;\n  }\n  for(const item of stack) {\n    switch(item) {\n      case '*':\n        memoryStack.push(popSafe() * popSafe());\n        break;\n      case '+':\n        memoryStack.push(popSafe() + popSafe());\n        break;\n      default:\n        memoryStack.push(item);\n    }\n  }\n\n  return popSafe();\n}\n\nconst reader = new MyFileReader(input);\nconst operations = reader.readLineByLine(toPostFixNotation);\nconst results = operations.map(calculatePostfixResult);\n\nconst sumOfResults = results.reduce((prev, curr) => prev + curr, 0);\nreturn sumOfResults;"}}]);