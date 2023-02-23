import {uwuEncode, uwuDecode} from './encoders/goofy/uwucode.js'
import {keymashEncode, keymashDecode} from './encoders/goofy/keymash.js'
import {invisEncode, invisDecode} from "./encoders/goofy/invischars.js"
import {hexEncode, hexDecode} from "./encoders/normal/base16.js"
import {binaryEncode, binaryDecode} from "./encoders/normal/base2.js"
import {aggressiveUrlEncode, aggressiveUrlEncodeNonDestructive} from "./encoders/normal/aggressiveUrl.js"


const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeSelector = document.getElementById("enDeCoderMode")
const encodeButton = document.getElementById("encodeButton")
const decodeButton = document.getElementById("decodeButton")

const endecoders = {
    "url": {
        desc: "Url encoding",
        encode: encodeURIComponent,
        decode: decodeURIComponent
    },
    "url (aggressive)": {
        desc: "Aggressive url encoding, which encodes every single character",
        encode: aggressiveUrlEncode,
        decode: decodeURI
    },
    "url (reverse pattern)": {
        desc: "Url encoding, keeps url valid but hard to read",
        encode: aggressiveUrlEncodeNonDestructive,
        decode: decodeURI
    },
    "base64": {
        desc: "Base64 encoding",
        encode: s => btoa(s),
        decode: s => atob(s)
    },
    "base16 (HEX)": {
        desc: "Base16 (HEX) encoding",
        encode: hexEncode,
        decode: hexDecode
    },
    "base2 (Binary)": {
        desc: "Base2 (Binary) encoding",
        encode: binaryEncode,
        decode: binaryDecode
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
    },
    "invisible characters": {
        desc: "Base16 (HEX) with characters which are invisible in chats",
        encode: invisEncode,
        decode: invisDecode
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

encodeButton.addEventListener("click", () => {
    outputBox.value = getCurrentmode().encode(inputBox.value)
})
decodeButton.addEventListener("click", () => {
    outputBox.value = getCurrentmode().decode(inputBox.value)
})

modeSelector.addEventListener("change", () => changeMode())
changeMode()