import {hexEncode, hexDecode} from "../normal/base16.js"
import {objectFlip} from "../../utils.js"

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