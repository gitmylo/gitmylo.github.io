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
        let charCode = parseInt(hex.substring(i, i + 2), 16)
        result += String.fromCharCode(charCode)
    }
    return result
}

export {hexEncode, hexDecode}