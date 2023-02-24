function randomCase(str) {
    let out = ""
    for (const char of str.split("")) {
        out += (Math.random() >= 0.5) ? char.toLowerCase() : char.toUpperCase()
    }
    return out
}

export {randomCase}