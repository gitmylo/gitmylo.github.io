class Setting {
    /**
     * @param name {string}
     * @param value {string|boolean|number}
     * @param min {number}
     * @param max {number}
     * @param step {number}
     */
    constructor(name = "", description = "", value = "", min = 0, max = Number.MAX_VALUE, step = 1) {
        this.name = name
        this.description = description
        this.value = value
        this.min = min
        this.max = max
        this.step = step
        if (typeof value === "boolean") {
            this.settingType = 0
        }
        else if (typeof value === "number") {
            this.settingType = 2
        }
        else if (typeof value === "object") {
            this.settingType = 3
            this.options = value
            this.value = value[0]
        }
        else if (typeof value === "string") {
            this.settingType = 1
        }
    }

    /**
     * @returns {HTMLLIElement}
     */
    getAsElement() {
        switch (this.settingType) {
            case 0:
                const cbel = document.createElement("li")
                cbel.title = this.description
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.value = this.value
                checkbox.addEventListener("change", () => this.value = checkbox.value)
                cbel.innerText = `${this.name}: `
                cbel.appendChild(checkbox)
                return cbel
            case 1:
                const strel = document.createElement("li")
                strel.title = this.description
                const strdiv = document.createElement("div")
                strdiv.innerText = `${this.name}:`
                strel.appendChild(strdiv)
                const strinput = document.createElement("textarea")
                strinput.value = this.value
                strinput.addEventListener("change", () => this.value = strinput.value)
                strel.appendChild(strinput)
                return strel
            case 2:
                const numel = document.createElement("li")
                numel.title = this.description
                const numdiv = document.createElement("div")
                numdiv.innerText = `${this.name}:`
                numel.appendChild(numdiv)
                const numinput = document.createElement("input")
                numinput.type = "number"
                numinput.value = this.value.toString()
                numinput.step = this.step.toString()
                numinput.min = this.min.toString()
                numinput.max = this.max.toString()
                numinput.addEventListener("change", () => this.value = numinput.value)
                numel.appendChild(numinput)
                return numel
            case 3:
                const comboel = document.createElement("li")
                comboel.title = this.description
                const combodiv = document.createElement("div")
                combodiv.innerText = `${this.name}:`
                comboel.appendChild(combodiv)
                const comboinput = document.createElement("select")
                for (const option of this.options) {
                    const optionEl = document.createElement("option")
                    optionEl.innerText = option
                    optionEl.value = option
                    comboinput.appendChild(optionEl)
                }
                comboel.appendChild(comboinput)
                comboinput.addEventListener("change", () => this.value = comboinput.value)
                return comboel
        }
    }
}

class Settings {
    /**
     * @param modName {string}
     * @param settings {Setting[]}
     */
    constructor(modName = "", settings = []) {
        this.modName = modName
        this.settings = settings
    }

    /**
     * @param titleEl {HTMLElement}
     * @param parentEl {HTMLElement}
     */
    loadSettings(titleEl, parentEl) {
        titleEl.innerText = this.modName
        parentEl.innerHTML = ""
        for (const setting of this.settings) {
            parentEl.appendChild(setting.getAsElement())
        }
    }
}

export {Setting, Settings}