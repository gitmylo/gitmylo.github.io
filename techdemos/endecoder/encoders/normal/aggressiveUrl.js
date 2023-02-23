function aggressiveUrlEncode(str) {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16)
        result += "%" + hex.padStart(2, '0')
    }
    return result.toUpperCase()
}

export {aggressiveUrlEncode}