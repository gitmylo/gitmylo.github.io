const word = /\w+/gm
const line = /\n/gm
const nonEmptyLine = /[^\n]$/gm

/**
 * @param str {string}
 * @returns {string}
 */
function wordcount(str) {
    return `This text contains:\n\t╠== ${(str.match(word) || []).length} words\n\t╠= ${(str.match(line) || []).length} lines (${(str.match(nonEmptyLine) || []).length} non empty lines)\n\t╚ ${str.length} total characters`
}

export {wordcount}