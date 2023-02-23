function binaryEncode(str) {
    let binary = ""
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i).toString(2)
        while (charCode.length < 8) {
            charCode = "0" + charCode
        }
        binary += charCode
    }
    return binary
}
function binaryDecode(binary) {
    let str = ""
    for (let i = 0; i < binary.length; i += 8) {
        let bits = binary.substring(i, i + 8)
        let charCode = parseInt(bits, 2)
        str += String.fromCharCode(charCode)
    }
    return str
}

export {binaryEncode, binaryDecode}