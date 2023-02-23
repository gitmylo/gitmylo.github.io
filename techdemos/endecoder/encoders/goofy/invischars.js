import {hexEncode, hexDecode} from "../normal/base16.js"
import {objectFlip} from "../../utils.js"

const encodeLookUpTable = {
    "0": "","1": "","2": "","3": "","4": "","5": "",
    "6": "","7": "","8": "","9": "","A": "","B": "",
    "C": "","D": "","E": "","F": "","=": ""
}
const decodeLookUpTable = objectFlip(encodeLookUpTable)

function invisEncode(input) {
    let encoded = hexEncode(input)
    for (const lookup in encodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, encodeLookUpTable[lookup])
    }
    return encoded
}
function invisDecode(input) {
    let encoded = input
    for (const lookup in decodeLookUpTable) {
        encoded = encoded.replaceAll(lookup, decodeLookUpTable[lookup])
    }
    return hexDecode(encoded)
}

export {invisEncode, invisDecode}