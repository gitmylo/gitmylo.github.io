import {hexEncode, hexDecode} from "../normal/base16.js"
import {objectFlip} from "../../utils.js"

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