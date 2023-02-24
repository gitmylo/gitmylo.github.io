import {Setting, Settings} from "../../settingslib.js"

const search = new Setting("Search", "Regex to search for", "\\w+")
const flags = new Setting("Regex flags", "Flags for the regex", "gm")
const replace = new Setting("Replace", "String to replace with, $& for match, $number for match group, all js substitutions supported. see regex101.com", "(($&))")

const settings = new Settings("Regex replace", [search, flags, replace])

function replaceProcess(str) {
    return str.replace(new RegExp(search.value, flags.value), replace.value)
}

export {replaceProcess, settings}