import {randomCase} from "./effects/randomcasing.js"
import {wordcount} from "./effects/wordcount.js"


const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeCatSelector = document.getElementById("effectModeCat")
const modeSelector = document.getElementById("effectMode")
const applyButton = document.getElementById("applyButton")
const settingsButton = document.getElementById("settingsButton")

const effects = {
    "general": {
        "random case": {
            desc: "Random upper/lower case",
            apply: randomCase
        },
        "word count": {
            desc: "Count words, lines and characters",
            apply: wordcount
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
        el.title = effect.desc
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