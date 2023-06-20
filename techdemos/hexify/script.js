const input = document.getElementById('input')
const output = document.getElementById('output')

const loadButton = document.getElementById('loadfromurl')
const loadUrl = document.getElementById('loadUrl')

const findMatches = document.getElementById('findmatches')

loadButton.addEventListener('click', () => {
    fetch(loadUrl.value)
        .then(r => r.text())
        .then(r => input.value = r)
        .catch(e => input.value = e)
})

const hexChars = '0123456789ABCDEF'.split('')

function repeatChar(char, amount) {
    let out = ''
    for (let i = 0; i < amount; i++) out += char
    return out
}

/**
 * Check if hex is valid
 * @param input {string} String to check.
 * @param len {number} Length to check and expand to.
 * @param leftF {number} Amount of F to add to left side before adding 0
 * @param capital {boolean} Use capital letters.
 * @return {string|false} Hex code if valid, false if not valid.
 */
function isValidHex(input, len = 6, leftF = 0, capital = true) {
    if (input.length > len) return false
    input = input.toUpperCase()
    for (const char of input.split('')) if (!hexChars.includes(char)) return false
    return repeatChar('0', len-input.length-2) + input[capital ? 'toUpperCase' : 'toLowerCase']() + repeatChar(capital?'F':'f', Math.min(len-input.length, 2))
}

function oppositeHexChar(char) {
    return hexChars[hexChars.length - hexChars.indexOf(char) - 1]
}

function oppositeHex(hex) {
    hex = hex.toUpperCase().replace('#', '').trim()
    hex = hex.split('').map(o => oppositeHexChar(o)).join('')
    if (hex.length === 8) {
        hex = hex.substring(0, 6) + 'FF'
    }
    return hex
}

findMatches.addEventListener('click', () => {
    output.innerHTML = ''
    for (const findMatch of input.value.split('\n').filter(inp => inp.trim() !== '')) {
        const trimmed = findMatch.trim()
        const validHex = isValidHex(trimmed, 8, 2)
        if (validHex !== false) {
            const el = document.createElement('li')
            el.innerText = `#${validHex}`
            el.style.backgroundColor = `#${validHex}`
            el.style.color = `#${oppositeHex(validHex)}`
            output.appendChild(el)
        }
    }
})
