function hexEncode(str) {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16)
        result += hex.padStart(2, '0')
    }
    return result.toUpperCase()
}

function hexDecode(hex) {
    hex = hex.toLowerCase()
    let result = ''
    for (let i = 0; i < hex.length; i += 2) {
        let charCode = parseInt(hex.substr(i, 2), 16)
        result += String.fromCharCode(charCode)
    }
    return result
}

function objectFlip(obj) {
    const ret = {}
    Object.keys(obj).forEach(key => {
        ret[obj[key]] = key
    })
    return ret
}

const encodeLookUpTable = {
    "0": "U","1": "w","2": "W","3": "3","4": "o","5": "O",
    "6": "^","7": "-","8": "_","9": "+","A": "'","B": "u",
    "C": ";","D": ":","E": "*","F": "$","=": "="
}
const decodeLookUpTable = objectFlip(encodeLookUpTable)

function uwuEncode(input) {
    let encoded = hexEncode(input)
    for (const lookup in encodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, encodeLookUpTable[lookup])
    }
    return encoded
}
function uwuDecode(input) {
    let encoded = input
    for (const lookup in decodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, decodeLookUpTable[lookup])
    }
    return hexDecode(encoded)
}

export {uwuEncode, uwuDecode}