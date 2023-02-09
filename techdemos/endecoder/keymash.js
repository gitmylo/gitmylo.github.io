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
    "0": "T","1": "S","2": "V","3": "N","4": "G","5": "H",
    "6": "J","7": "K","8": "L","9": "U","A": "A","B": "B",
    "C": "R","D": "D","E": "Y","F": "F","=": "M"
}
const decodeLookUpTable = objectFlip(encodeLookUpTable)

function keymashEncode(input) {
    let encoded = hexEncode(input)
    for (const lookup in encodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, encodeLookUpTable[lookup])
    }
    return encoded
}
function keymashDecode(input) {
    let encoded = input
    for (const lookup in decodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, decodeLookUpTable[lookup])
    }
    return hexDecode(encoded)
}

export {keymashEncode, keymashDecode}