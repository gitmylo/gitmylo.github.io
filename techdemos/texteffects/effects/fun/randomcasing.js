import {Setting, Settings} from "../../settingslib.js"

const chance = new Setting("uppercase chance", "The chance of a letter to be set as uppercase, in %", 50, 0, 100, 1)

const settings = new Settings("Random casing", [chance])

function randomCase(str) {
    let out = ""
    for (const char of str.split("")) {
        out += (Math.random() >= chance.value / 100) ? char.toLowerCase() : char.toUpperCase()
    }
    return out
}

export {randomCase, settings}