/**
 * @type {HTMLTextAreaElement}
 */
const input = document.getElementById('input'),
/**
 * @type {HTMLTextAreaElement}
 */
    output = document.getElementById('output');

class WordChance {
    /**
     * Word Chance
     * @param word {string}
     * @param chance {number}
     */
    constructor(word, chance) {
        this.word = word;
        this.chance = chance;
    }
}
class WordLink {
    /**
     * Word Links
     * @param source {string}
     * @param possibleSteps {number[]}
     */
    constructor(source, possibleSteps) {
        this.source = source;
        this.possibleSteps = possibleSteps;
    }

    /**
     * Increment step
     * @param nextword {string}
     */
    incrementStep = function (nextword) {
        this.possibleSteps ??= [];
        const array = this.possibleSteps.filter(l => l.word === nextword);
        if (array.length === 0)
        {
            this.possibleSteps.push(new WordChance(nextword, 1));
        }
        else array[0].chance++;
    }
}
class ProcessResults {
    /**
     * Process results
     * @param startWord {string}
     * @param endWord {string}
     * @param links {WordLink[]}
     */
    constructor(startWord = "", endWord = "", links = []) {
        this.startWord = startWord;
        this.endWord = endWord;
        this.links = links;
    }

    /**
     * get links for word
     * @param word {string}
     */
    getLinkFromWord = function (word) {
        const array = this.links.filter(l => l.source == word);
        if (array.length == 0) return null;
        return array[0];
    }
    /**
     * get links for word and create if not existing
     * @param word {string}
     */
    getLinkFromWordAndCreate = function (word) {
        const array = this.links.filter(l => l.source == word);
        if (array.length == 0)
        {
            const newLink = new WordLink(word, []);
            this.links.push(newLink);
            return newLink;
        }
        return array[0];
    }
}

/**
 * Process to network
 * @param input {string}
 */
function process(data) {
    const split = data.split(' ');
    const results = new ProcessResults();
    results.startWord = split[0];
    results.links = [];
    let last = split[0];
    for (let s of split)
    {
        if (s == last) continue; // no support for that right now
        results.getLinkFromWordAndCreate(last.toLowerCase()).incrementStep(s);
        last = s;
    }
    results.endWord = last;
    return results;
}

/**
 * string Bias
 * @param inData {ProcessResults}
 * @param word {string}
 * @returns {string[]}
 */
function stringBias(inData, word) {
    const results = [];
    const link = inData.getLinkFromWord(word.toLowerCase());
    if (link != null)
    {
        for (let step of link.possibleSteps)
        {
            for (let i = 0; i < step.chance; i++)
            {
                results.push(step.word);
            }
        }
    }
    else
    {
        results.push(inData.endWord);
    }

    return results;
}

/**
 *
 * @param inData {ProcessResults}
 * @returns {string}
 */
function create(inData) {
    let generated = inData.startWord;
    const splitList = inData.startWord.split(' ');
    let word = splitList[splitList.length-1];
    while (word != inData.endWord)
    {
        const stringBias_ = stringBias(inData, word);
        word = stringBias_[Math.floor(Math.random()*stringBias_.length)];
        generated += ` ${word}`;
    }
    return generated;
}

document.getElementById('generateButton').addEventListener('click', ev => {
    output.value = create(process(input.value));
});