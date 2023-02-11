/**
 * @param input {string}
 * @returns {string}
 */
function processInput(input) {
    return input.replace(/[^\d ]/g, "")
}

/**
 * @param array {number[]}
 * @returns {string}
 */
function arrayToOutput(array) {
    let output = "+---+---+---+\n"
    for (let i = 0; i < array.length; i++) {
        const num = array[i]
        if (i%27===0 && i!==0) output += "|\n+---+---+---+\n"
        else if (i%9===0 && i!==0) output += "|\n"
        if (i%3===0) output += "|"
        let char = num.toString().replace("0", " ")
        output += char
    }
    output += "|\n+---+---+---+"
    return output
}

/**
 * @param index {number}
 * @returns {{x:number, y:number}}
 */
function getCoordinates(index) {
    return {
        x: index%9,
        y: Math.floor(index/9)
    }
}

/**
 * @param coordinates {{x:number, y:number}}
 * @returns {number}
 */
function getIndex(coordinates) {
    return coordinates.x + coordinates.y * 9
}

/**
 * @param coordinates {{x:number, y:number}}
 * @return {{x:number, y:number}}
 */
function getSquarePos(coordinates) {
    return {
        x: Math.floor(coordinates.x/3),
        y: Math.floor(coordinates.y/3)
    }
}

/**
 * @param index {number}
 * @returns {number[]}
 */
function getOtherIndexes(index) {
    const coords = getCoordinates(index)
    const square = getSquarePos(coords)
    const x = coords.x
    const y = coords.y
    const values = []
    for (let i = 0; i < 81; i++) {
        if (i === index) continue
        if (getSquarePos(getCoordinates(index)) === square || getCoordinates(i).x === x || getCoordinates(i).y === y) {
            values.push(i)
        }
    }
    return values.filter((item, index) => values.indexOf(item) === index)
}

/**
 * @param index {number}
 * @param input {number[]}
 * @returns {number[]}
 */
function getOtherValues(index, input) {
    const coords = getCoordinates(index)
    const square = getSquarePos(coords)
    const x = coords.x
    const y = coords.y
    const values = []
    for (let i = 0; i < input.length; i++) {
        if (i === index || input[i] === 0) continue
        const sp = getSquarePos(getCoordinates(i))
        if ((sp.x === square.x && sp.y === square.y) || getCoordinates(i).x === x || getCoordinates(i).y === y) {
            values.push(input[i])
        }
    }
    return values.filter((item, index) => values.indexOf(item) === index)
}

/**
 * @param input {number[]}
 * @return {{index:number, value:number, coords: {x:number, y:number}, disallowedValues:number[], allowedValues:{"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number, "8": number, "9": number}}[]}
 */
function createComplexObject(input) {
    const object = []
    for (let i = 0; i < input.length; i++) {
        const otherValues = getOtherValues(i, input)
        const allowedValues = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}
        for (const val in allowedValues) if (!otherValues.includes(parseInt(val))) allowedValues[val] = 1
        object.push({
            index: i,
            value: input[i],
            coords: getCoordinates(i),
            disallowedValues: otherValues,
            allowedValues: allowedValues
        })
    }
    return object
}

/**
 * @param input {number[]}
 * @return {boolean}
 */
function isFullySolved(input) {
    for (const n of input) {
        if (getOtherValues(n, input).includes(input[n])) return false
    }
    return !input.includes(0)
}

/**
 * Get the possible values for the current tile
 * @param input {{index:number, value:number, coords: {x:number, y:number}, disallowedValues:number[], allowedValues:{"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number, "8": number, "9": number}}[]}
 * @param index {number}
 * @param depth {number}
 * @param arr {number[]}
 * @returns {{"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number, "8": number, "9": number}}
 */
function deepSolve(input, index, depth, arr) {
    let out = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1}
    if (depth > 0) for (const i of getOtherIndexes(index)) {
        if (arr[i] !== 0) continue
        const rec = deepSolve(input, i, depth-1, arr)
        // Filtering
        for (const rr in rec) {
            out[rr] /= rec[rr]
        }
    }
    const filtered = JSON.parse(JSON.stringify(input[index].allowedValues))//{"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1}
    let penalty = 0
    for (const v in filtered) {
        if (filtered[v] !== 0) ++penalty
    }
    //valid slots will have a value of 1
    for (const v in filtered) {
        filtered[v] += out[v] + penalty
    }
    return filtered
}

/**
 * @param input {number[]}
 * @param depth {number}
 * @returns {number[]}
 */
function step(input, depth) {
    const deeps = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== 0) continue
        const complex = createComplexObject(input)
        const deep = deepSolve(complex, i, depth, input)
        let highest = "0", highestVal = 0;
        for (const num in deep) {
            if (deep[num] > highestVal) highest = num, highestVal = deep[num]
        }
        deeps.push({
            index: i,
            options: deep,
            commonOption: highest,
            commonPercentage: highestVal
        })
        //if (i===0)
            //console.log(deep, highest, false)
    }
    /*for (const deep of deeps.sort((a, b) => a.commonPercentage > b.commonPercentage ? 1 : -1)) {
        console.log(deep.index, deep.commonOption)
        if (deep.commonOption !== "0") input[deep.index] = parseInt(deep.commonOption)
    }*/
    const deep = deeps.sort((a, b) => a.commonPercentage > b.commonPercentage ? 1 : -1)[0]
    if (deep) {
        if (deep.commonOption !== "0") input[deep.index] = parseInt(deep.commonOption)
    }
}

/**
 * @param input {string}
 * @param depth {number}
 */
function solve(input, depth) {
    input = processInput(input)
    if (input.length !== 81) return "Wrong sudoku format, not 81 characters"
    let array = []
    for (const char of input.split("")) {
        if (char === " ") array.push(0)
        else array.push(Number.parseInt(char))
    }

    for (let i = 0; i < 100; i++) {
        step(array, depth)
        if (isFullySolved(array)) break
    }

    return `${arrayToOutput(array)}\nCorrectly solved: ${isFullySolved(array)}`
}

export {solve}