/**
 * 将数组或对象转化为字符串
 */
const typings = {
    number: '[object Number]',
    string: '[object String]',
    boolean: '[object Boolean]',
    symbol: '[object Symbol]',
    bigInt: '[object BigInt]',
    null: '[object Null]',
    undefined: '[object Undefined]',
    object: '[object Object]',
    array: '[object Array]',
    function: '[object Function]',
    regExp: '[object RegExp]',
    math: '[object Math]',
    date: '[object Date]',
    map: '[object Map]',
    set: '[object Set]',
    generator: '[object GeneratorFunction]'
}

const arrowReg = /=\>/s
const argsReg = /\((.*)\)/
const codeBlockReg = /\{(.*)\}/s

/**
 * 主函数
 * @param {object | array} val 
 * @returns {string}
 */
function stringify(val) {
    const type = getType(val)
    // 处理边界
    if (
        type !== typings.object &&
        type !== typings.array
    ) {
        throw new TypeError('Arguments are not arrays or objects')
    }

    return '(' + handler(val, type) + ')'
}

/**
 * 处理器
 * @param {any} val 
 * @param {string} type 
 * @returns {string}
 */
function handler(val, type) {
    switch (type) {
        case typings.number:
            return createNum(val)
        case typings.string:
            return createStr(val)
        case typings.boolean:
            return createBool(val)
        case typings.null:
            return createNull()
        case typings.undefined:
            return createUndefined()
        case typings.bigInt:
            return createBigInt(val)
        case typings.symbol:
            return createSymbol(val)
        case typings.function:
            return createFunc(val)
        case typings.generator:
            return createGenerator(val)
        case typings.object:
            return createObj(val)
        case typings.array:
            return createArr(val)
        case typings.map:
            return createMap(val)
        case typings.set:
            return createSet(val)
        case typings.math:
            return createMath()
        default:
            return
    }
}

/**
 * 创建函数
 */
function createNum(num) {
    return num
}

function createStr(str) {
    return `'${str}'`
}

function createBool(bool) {
    return bool ? 'true' : 'false'
}

function createNull() {
    return 'null'
}

function createUndefined() {
    return 'undefined'
}

function createBigInt(bigInt) {
    return bigInt.toString() + 'n'
}

function createSymbol(symbol) {
    const description = symbol.description
    const isFor = Symbol.for(description) === symbol

    return isFor ? `Symbol.for('${description}')` : `Symbol('${description}')`
}

function createFunc(func) {
    if (arrowReg.test(func)) {
        return func.toString()
    } else {
        func = func.toString()
        const args = func.match(argsReg)[0]
        const codeBlock = func.match(codeBlockReg)[0]
        return `function ${args + codeBlock}`
    }
}

function createGenerator(generator) {
    if (arrowReg.test(generator)) {
        return func.toString()
    } else {
        generator = generator.toString()
        const args = generator.match(argsReg)[0]
        const codeBlock = generator.match(codeBlockReg)[0]
        return `function *${args + codeBlock}`
    }
}

function createObj(obj) {
    let start = '{'
    let end = '}'
    let res = ''

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res += `${key}: ${handler(obj[key], getType(obj[key]))},`
        }
    }
    const symbolList = Object.getOwnPropertySymbols(obj)
    for (const symbol of symbolList) {
        const symbolStr = createSymbol(symbol)
        res += `[${symbolStr}]: ${handler(obj[symbol], getType(obj[symbol]))},`
    }

    return start + res.slice(0, -1) + end
}

function createArr(arr) {
    let start = '['
    let end = ']'
    let res = ''

    for (const item of arr) {
        res += handler(item, getType(item)) + ','
    }

    return start + res.slice(0, -1) + end
}

function createMap(map) {
    let start = 'new Map(['
    let end = '])'
    let res = ''
    map.forEach((val, key) => {
        res += `[${handler(key, getType(key))}, ${handler(val, getType(val))}],`
    })

    return start + res.slice(0, -1) + end
}

function createSet(set) {
    let start = 'new Set('
    let end = ')'

    return start + createArr([...set]) + end
}

function createMath() {
    return 'Math'
}

/**
 * 封装Object.toString方法
 * @param {any} val 
 * @returns {string}
 */
function getType(val) {
    return Object.prototype.toString.call(val)
}