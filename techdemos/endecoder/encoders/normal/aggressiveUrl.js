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
    if (str.indexOf("://") !== -1) {
        const location = str.indexOf("://")
        hold = str.substring(0, location)
        str = str.substring(location)
    }

    let result = ''
    for (let i = 0; i < str.length; i++) {
        if (ignoreChars.includes(str.charAt(i))) {
            result += str.charAt(i)
            continue
        }
        let hex = str.charCodeAt(i).toString(16)
        result += "%" + hex.padStart(2, '0')
    }
    return hold + result.toUpperCase()
}

export {aggressiveUrlEncode, aggressiveUrlEncodeNonDestructive}