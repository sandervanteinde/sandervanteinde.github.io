(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{pHL4:function(n,e,r){"use strict";r.r(e),r.d(e,"dayTwoPartTwo",function(){return t});const t="function isValidPassword(entry: typeof passwords[number]): boolean {\n    const isLeftMatch = entry.password[entry.minimum - 1] === entry.requiredLetter;\n    const isRightMatch = entry.password[entry.maximum - 1] === entry.requiredLetter;\n    return isLeftMatch !== isRightMatch;\n}\nconst reader = new MyFileReader(input);\nconst passwords = reader.readLineByLine(line => {\n    const regex = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;\n    const match = line.match(regex);\n    if(!match) throw new Error(`No match for line: ${line}`);\n    return {\n        minimum: Number(match[1]),\n        maximum: Number(match[2]),\n        requiredLetter: match[3],\n        password: match[4]\n    }\n});\n\nconst succeededPasswords = passwords.reduce((previous, value) => {\n    if(isValidPassword(value)) {\n        return previous + 1;\n    }\n    return previous;\n}, 0);\n\nreturn succeededPasswords;"}}]);