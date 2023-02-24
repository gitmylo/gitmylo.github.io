import {randomCase} from "./effects/randomcasing.js";


const inputBox = document.getElementById("input")
const outputBox = document.getElementById("output")
const modeSelector = document.getElementById("effectMode")
const applyButton = document.getElementById("applyButton")

const effects = {
    "random case": {
        desc: "random upper/lower case",
        apply: randomCase
    }
}

// Load the modes into the modeSelector
for (const effect in effects) {
    let el = document.createElement("option")
    el.value = effect
    el.innerText = effect
    el.title = effects[effect].desc
    modeSelector.appendChild(el)
}

function getCurrentmode() {
    return effects[modeSelector.value]
}

function changeMode() {
    applyButton.disabled = getCurrentmode().apply === undefined
}

applyButton.addEventListener("click", () => {
    outputBox.value = getCurrentmode().apply(inputBox.value)
})

modeSelector.addEventListener("change", () => changeMode())
changeMode()