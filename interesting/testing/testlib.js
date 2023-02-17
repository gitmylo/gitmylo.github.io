class TestButton {
    constructor(text, tooltip, clickResponse) {
        this.text = text
        this.tooltip = tooltip
        this.clickResponse = clickResponse
    }
}

class TestPage {
    /**
     * @param title {string}
     * @param description {string|function}
     * @param buttons {TestButton[]}
     */
    constructor(title, description, buttons = []) {
        this.title = title
        this.description = description
        this.buttons = buttons
    }

    /**
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement("div")// main div
        div.classList.add("fillparent")
        
        const title = document.createElement("h1")// Title
        title.innerHTML = this.title
        div.appendChild(title)
        
        const description = document.createElement("h3")// description
        description.innerHTML = this.description
        div.appendChild(description)

        if (this.buttons && this.buttons.length > 0) {
            const middleEl = document.createElement("div")
            middleEl.classList.add("middle")
            div.appendChild(middleEl)

            for (const button of this.buttons) {
                const buttonEl = document.createElement("a")
                buttonEl.classList.add("button")
                buttonEl.innerHTML = button.text
                buttonEl.title = button.tooltip
                buttonEl.addEventListener("click", button.clickResponse)
                middleEl.appendChild(buttonEl)
            }
        }

        return div
    }

    /**
     * @param parentElement {HTMLElement}
     */
    displayPage(parentElement) {
        parentElement.innerHTML = ""
        parentElement.appendChild(this.createElement())
    }
}

class ResultPage extends TestPage {
    /**
     * @param title {string}
     * @param element {function}
     */
    constructor(title, element) {
        super(title, element, []);
    }

    /**
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement("div")// main div
        div.classList.add("fillparent")

        const title = document.createElement("h1")// Title
        title.innerHTML = this.title
        div.appendChild(title)

        div.appendChild(this.description())

        return div
    }
}

class Test {
    /**
     * @param parentElement {HTMLElement}
     * @param startPage {TestPage}
     */
    constructor(parentElement, startPage) {
        this.parentElement = parentElement
        this.startPage = startPage
        this.data = {}
    }

    /**
     * Display the start page
     */
    start() {
        this.startPage.displayPage(this.parentElement)
    }
}

export {Test, TestPage, ResultPage, TestButton}