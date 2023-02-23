function aggressiveUrlEncode(str) {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16)
        result += "%" + hex.padStart(2, '0')
    }
    return result.toUpperCase()
}

const ignoreChars = ["/", ".", ":", "?", "&", "+", "="]

function aggressiveUrlEncodeNonDestructive(str) {
    let hold = ""
    let skip = 0
    if (str.indexOf("://") !== -1) {
        const location = str.indexOf("://")
        hold = str.substring(0, location)
        str = str.substring(location)
    }

    let result = ''
    for (let i = 0; i < str.length; i++) {
        const charHere = str.charAt(i)
        if (charHere === "%") skip = 2
        if (skip >= 0) {
            result += charHere
            --skip
            continue
        }
        if (ignoreChars.includes(charHere)) {
            result += charHere
            continue
        }
        let hex = str.charCodeAt(i).toString(16)
        result += "%" + hex.padStart(2, '0')
    }
    return hold + result.toUpperCase()
}

export {aggressiveUrlEncode, aggressiveUrlEncodeNonDestructive}