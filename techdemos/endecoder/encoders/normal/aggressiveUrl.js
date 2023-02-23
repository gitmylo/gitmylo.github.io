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

    if (str.startsWith("https")) {
        hold = "https"
        str = str.substring(5)
    }
    if (str.startsWith("http")) {
        hold = "http"
        str = str.substring(4)
    }

    let result = ''
    for (let i = 0; i < str.length; i++) {
        if (ignoreChars.includes(str.charAt(i))) {
            result += str.charAt(i)
            continue
        }
        console.log(str.charAt(i))
        let hex = str.charCodeAt(i).toString(16)
        result += "%" + hex.padStart(2, '0')
    }
    return hold + result.toUpperCase()
}

export {aggressiveUrlEncode, aggressiveUrlEncodeNonDestructive}