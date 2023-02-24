import {Setting, Settings} from "../../settingslib.js"

const mode = new Setting("Shuffle type", "What should be shuffled?", ["Characters", "Characters (keep boundaries)", "Words", "Lines"])
const settings = new Settings("Shuffle", [mode])

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }

    return array
}

function shuffle(str) {
    switch (mode.value) {
        case "Characters":
            return shuffleArray(str.split("")).join("")
        case "Characters (keep boundaries)":
            return str.split(" ").map(v => shuffleArray(v.split("")).join("")).join(" ")
        case "Words":
            return shuffleArray(str.split(" ")).join(" ")
        case "Lines":
            return shuffleArray(str.split("\n")).join("\n")
    }
    return "This mode is not implemented"
}

export {shuffle, settings}