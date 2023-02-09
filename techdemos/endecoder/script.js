import {uwuEncode, uwuDecode} from './uwucode.js'
import {keymashEncode, keymashDecode} from './keymash.js'

const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeSelector = document.getElementById("enDeCoderMode")
const encodeButton = document.getElementById("encodeButton")
const decodeButton = document.getElementById("eecodeButton")

const endecoders = {
    "base64": {
        desc: "Base64 encoding",
        encode: s => btoa(s),
        decode: s => atob(s)
    },
    "uwucode": {
        desc: "Base16 (HEX) with characters that look like faces",
        encode: uwuEncode,
        decode: uwuDecode
    },
    "key mash": {
        desc: "Base16 (HEX) with characters that look like keymashes",
        encode: keymashEncode,
        decode: keymashDecode
    }
}

// Load the modes into the modeSelector
for (const endecoder in endecoders) {
    let el = document.createElement("option")
    el.value = endecoder
    el.innerText = endecoder
    el.title = endecoders[endecoder].desc
    modeSelector.appendChild(el)
}

function getCurrentmode() {
    return endecoders[modeSelector.value]
}

function changeMode() {
    encodeButton.disabled = getCurrentmode().encode === undefined
    decodeButton.disabled = getCurrentmode().decode === undefined
}

encodeButton.addEventListener("click", e => {
    outputBox.value = getCurrentmode().encode(inputBox.value)
})
decodeButton.addEventListener("click", e => {
    outputBox.value = getCurrentmode().decode(inputBox.value)
})

modeSelector.addEventListener("change", e => changeMode())
changeMode()