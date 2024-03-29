import {Test, TestPage, ResultPage, TestButton} from "./testlib.js"

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

class Symptom {
    /**
     * @param name {string}
     * @param description {string}
     * @param examples {string[]}
     */
    constructor(name, description = "", examples = []) {
        this.name = name
        this.description = description
        this.examples = examples
    }
}

class Disorder {
    /**
     * @param name {string}
     * @param description {string}
     * @param minSymptomAmount {number}
     * @param symptoms {Symptom[]}
     */
    constructor(name, description, minSymptomAmount, symptoms) {
        this.name = name
        this.description = description
        this.minSymptomAmount = minSymptomAmount
        this.symptoms = symptoms
    }
}

class PsychTest {
    /**
     * @param name {string}
     * @param description {string}
     * @param symptoms {Symptom[]}
     * @param disorders {Disorder[]}
     */
    constructor(name, description, symptoms, disorders) {
        this.name = name
        this.description = description
        this.symptoms = symptoms
        this.disorders = disorders
        this.confirmedSymptoms = []
    }

    start(parentElement) {
        let nextPage = new ResultPage("\"" + this.name + "\" results. symptoms as (yours/minimum/total)", () => this.createResultHtml())
        for (const symptom of shuffle(this.symptoms)) {
            let description = symptom.description
            if (symptom.examples.length > 0) {
                description += "<br><br>Examples:<ul>"
                for (const example of symptom.examples) {
                    description += `<li>${example}</li>`
                }
                description += "</ul>"
            }
            const followingPage = nextPage
            nextPage = new TestPage(symptom.name, description, [
                new TestButton("Confirm", "Confirm", e => {
                    this.confirmedSymptoms.push(symptom)
                    followingPage.displayPage(parentElement)
                }),
                new TestButton("Deny", "Deny", e => {
                    followingPage.displayPage(parentElement)
                })
            ])
        }
        const test = new Test(parentElement, new TestPage(this.name, this.description, [new TestButton("Start", "Start the test", e => {
            nextPage.displayPage(parentElement)
        })]))

        test.start()
    }

    /**
     * @returns {HTMLUListElement}
     */
    createResultHtml() {
        const list = document.createElement("ul")
        const disorders = this.checkAllDisorders()
        if (disorders.length > 0) {
            for (const disorder of disorders) {
                const li = document.createElement("li")
                li.innerHTML = `${disorder.name} - (${this.checkDisorderSymptomCount(disorder)}/${disorder.minSymptomAmount}/${disorder.symptoms.length})`
                li.title = disorder.description
                list.appendChild(li)
            }
        }
        else {
            const li = document.createElement("li")
            li.innerHTML = `You did not match the DSM-V criteria of any personality disorder based on this test!`
            li.title = "Nothing found."
            list.appendChild(li)
        }
        return list
    }

    /**
     * @param disorder
     * @returns {number}
     */
    checkDisorderSymptomCount(disorder) {
        return disorder.symptoms.filter(sym => this.confirmedSymptoms.includes(sym)).length
    }

    /**
     * @param disorder {Disorder}
     * @returns {boolean}
     */
    checkDisorder(disorder) {
        return this.checkDisorderSymptomCount(disorder) >= disorder.minSymptomAmount
    }

    /**
     * @returns {Disorder[]}
     */
    checkAllDisorders() {
        const out = []
        for (const disorder of this.disorders) {
            if (this.checkDisorder(disorder)) {
                out.push(disorder)
            }
        }
        return out
    }
}

export {PsychTest, Symptom, Disorder}