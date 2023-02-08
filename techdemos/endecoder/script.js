import {uwuEncode, uwuDecode} from './uwucode.js'

const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeSelector = document.getElementById("enDeCoderMode")
const encodeButton = document.getElementById("encodeButton")
const decodeButton = document.getElementById("eecodeButton")

const endecoders = {
    "base64": {
        encode: t => {
            return btoa(t)
        },
        decode: t => {
            return atob(t)
        }
    },
    "uwucode": {
        encode: uwuEncode,
        decode: uwuDecode
    }
}

// Load the modes into the modeSelector
for (const endecoder in endecoders) {
    let el = document.createElement("option")
    el.value = endecoder
    el.innerText = endecoder
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