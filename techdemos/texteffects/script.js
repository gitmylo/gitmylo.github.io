import {randomCase, settings as caseSettings} from "./effects/fun/randomcasing.js"
import {shuffle, settings as shuffleSettings} from "./effects/fun/shuffle.js";
import {replaceProcess, settings as replaceSettings} from "./effects/general/replace.js"
import {hash, settings as hashSettings} from "./effects/general/hash.js"
import {wordcount} from "./effects/general/wordcount.js"

const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeCatSelector = document.getElementById("effectModeCat")
const modeSelector = document.getElementById("effectMode")
const applyButton = document.getElementById("applyButton")
const settingsButton = document.getElementById("settingsButton")

const effects = {
    "general": {
        "reverse": {
            desc: "Reverses text",
            apply: t => t.split("").reverse().join("")
        },
        "replace text": {
            desc: "Replace text, using regex",
            apply: replaceProcess,
            settings: replaceSettings
        },
        "word count": {
            desc: "Count words, lines and characters",
            apply: wordcount
        },
        "hash": {
            desc: "Hash a string",
            apply: hash,
            settings: hashSettings
        }
    },
    "fun": {
        "random case": {
            desc: "Random upper/lower case",
            apply: randomCase,
            settings: caseSettings
        },
        "shuffle": {
            desc: "Shuffle characters, words, or lines",
            apply: shuffle,
            settings: shuffleSettings
        },
        "pig latin": {
            desc: "a language game where the first letter of each word is moved to the end of the word and \"ay\" is added",
            apply: t => {
                let out = ""
                let firstChar = ""
                let allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                for (const char of t.split("")) {
                    const currentAllowed = allowedChars.includes(char)
                    if (!currentAllowed && firstChar !== "") {
                        out += `${firstChar}ay`
                        firstChar = ""
                    }
                    if (firstChar === "" && currentAllowed) {
                        firstChar = char
                    }
                    else {
                        out += char
                    }
                }
                return out
            }
        }
    }
}

function loadCategories() {
    modeCatSelector.innerHTML = ""
    // Load the categories into the modeSelector
    for (const cat in effects) {
        let el = document.createElement("option")
        el.value = cat
        el.innerText = cat
        modeCatSelector.appendChild(el)
    }
    loadModes()
}

function loadModes() {
    modeSelector.innerHTML = ""
    // Load the modes into the modeSelector
    for (const effect in getCurrentCategory()) {
        let el = document.createElement("option")
        el.value = effect
        el.innerText = effect
        el.title = getCurrentCategory()[effect].desc
        modeSelector.appendChild(el)
    }
    changeMode()
}

function loadSettings() {
    if (getCurrentmode().settings !== undefined) {
        getCurrentmode().settings.loadSettings(document.getElementById("settingsTitle"), document.getElementById("settings"))
    }
}

function getCurrentmode() {
    return getCurrentCategory()[modeSelector.value]
}

function getCurrentCategory() {
    return effects[modeCatSelector.value]
}

function changeMode() {
    loadSettings()
    applyButton.disabled = getCurrentmode().apply === undefined
    settingsButton.disabled = getCurrentmode().settings === undefined
}

applyButton.addEventListener("click", () => {
    outputBox.value = getCurrentmode().apply(inputBox.value)
})

modeCatSelector.addEventListener("change", () => loadModes())
modeSelector.addEventListener("change", () => changeMode())
loadCategories()