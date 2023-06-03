function simpleHeader(title, description) {
    const contentDiv = document.createElement('div')
    const titleEl = document.createElement('h1')
    const descrEl = document.createElement('p')
    titleEl.innerText = title
    descrEl.innerText = description
    contentDiv.appendChild(titleEl)
    contentDiv.appendChild(descrEl)
    return contentDiv
}

/**
 *
 * @param title {string}
 * @param data {string[]}
 * @param customFormatting {function(string): string}}
 * @param extras {{key:{value:function(string):boolean, onvalue:function(string, value)}}}
 * @returns {HTMLTableElement}
 */
function simpleTable(title, data, customFormatting=(i)=>i, extras={}) {
    const tel = document.createElement('table')
    const headerRow = document.createElement('tr')
    const headerText = document.createElement('th')
    headerText.innerText = title
    headerRow.appendChild(headerText)
    for (const extraName in extras) {
        const extraText = document.createElement('th')
        extraText.innerText = extraName
        headerRow.appendChild(extraText)
    }
    tel.appendChild(headerRow)

    for (const d of data) {
        const row = document.createElement('tr')
        const rowText = document.createElement('td')
        rowText.innerHTML = customFormatting(d)
        row.appendChild(rowText)
        for (const extraName in extras) {
            const extraVals = extras[extraName]
            const extraText = document.createElement('td')
            const checkBox = document.createElement('input')
            checkBox.type = 'checkbox'
            checkBox.checked = extraVals.value(d)
            checkBox.addEventListener('change', () => {
                extraVals.onvalue(d, checkBox.checked)
            })
            extraText.appendChild(checkBox)
            row.appendChild(extraText)
        }
        tel.appendChild(row)
    }
    return tel
}

function updateStrList(data, div, otherels) {
    const listel = document.createElement('ul')
    for (const d of data) {
        const item = document.createElement('li')
        const removeButton = document.createElement('button')
        removeButton.addEventListener('click', () => {
            const index = data.indexOf(d)
            if (index > -1) {
                data.splice(index, 1)
            }
            div.innerHTML = ''
            div.appendChild(updateStrList(data, div, otherels))
            for (const el of otherels) {
                div.appendChild(el)
            }
        })
        removeButton.innerText = 'remove'
        item.innerText = d

        item.appendChild(removeButton)

        listel.appendChild(item)
    }
    return listel
}

function strList(data) {
    const div = document.createElement('div')
    div.appendChild(updateStrList(data))


    const addBox = document.createElement('input')
    addBox.type = 'text'
    addBox.addEventListener('keypress', ev => {
        if (ev.key === 'Enter') {
            div.innerHTML = ''
            const dataText = addBox.value
            addBox.value = ''
            data.push(dataText)
            div.appendChild(updateStrList(data, div, [addBox, addButton]))
            div.appendChild(addBox)
            div.appendChild(addButton)
            addBox.select()
        }
    })
    const addButton = document.createElement('button')
    addButton.innerText = 'Add'
    addButton.addEventListener('click', () => {
        div.innerHTML = ''
        const dataText = addBox.value
        addBox.value = ''
        data.push(dataText)
        div.appendChild(updateStrList(data, div, [addBox, addButton]))
        div.appendChild(addBox)
        div.appendChild(addButton)
    })
    div.appendChild(addBox)
    div.appendChild(addButton)
    return div
}

class NormStep {
    data = []
    loadFromStep(lastStepData) {}

    /**
     * @returns {HTMLElement}
     */
    createUI() {}

    /**
     * @returns {string}
     */
    toText() {}
}

// ==============STEP 1=================

class Step1_1 extends NormStep {
    constructor() {
        super()
        this.data = ['test', 'test2', 'test3', 'test4']
    }
    createUI() {
        const contentDiv = document.createElement('div')
        contentDiv.appendChild(simpleHeader('Step 1.1, list data', 'Add all the data to the list'))
        contentDiv.appendChild(strList(this.data))
        return contentDiv
    }

    toText() {
        return this.data.join('\n')
    }
}

class Step1_2 extends NormStep {

    loadFromStep(lastStepData) {
        this.data = lastStepData.map(d => {return {name:d, type:'entity'}})
    }

    createUI() {
        const contentDiv = document.createElement('div')
        contentDiv.appendChild(simpleHeader('Step 1.2, categorise data', 'Put the data into categories'))
        const listEl = document.createElement('ul')
        for (const item of this.data) {
            const listItem = document.createElement('li')
            listItem.innerText = item.name
            const categorySelect = document.createElement('select')
            const options = ['entity', 'form text', 'constant', 'process data']
            for (const option of options) {
                const optEl = document.createElement('option')
                optEl.innerText = option
                optEl.value = option
                categorySelect.appendChild(optEl)
            }
            categorySelect.addEventListener('change', () => {
                item.type = categorySelect.value
            })
            listItem.appendChild(categorySelect)
            listEl.appendChild(listItem)
        }
        contentDiv.appendChild(listEl)
        return contentDiv
    }

    toText() {
        return this.data.map(d => `${d.name} ${d.type}`).join('\n')
    }
}

// ==============STEP 2=================

class Step2 extends NormStep {
    loadFromStep(lastStepData) {
        this.data = {title: 'Title', data: lastStepData}
    }

    createUI() {
        const contentDiv = document.createElement('div')
        contentDiv.appendChild(simpleHeader('Step 2, clean up and create a title', 'Create a title for the table.'))
        const titleBox = document.createElement('input')
        titleBox.type = 'text'
        titleBox.value = this.data.title
        titleBox.addEventListener('keyup', () => this.data.title = titleBox.value.toUpperCase())
        contentDiv.appendChild(titleBox)
        const listEl = document.createElement('ul')
        for (const item of this.data.data) {
            const listItem = document.createElement('li')
            listItem.innerHTML = `${item.name} - <b>${item.type}</b>`
            listEl.appendChild(listItem)
        }
        contentDiv.appendChild(listEl)
        return contentDiv
    }

    toText() {
        return [
            this.data.data.filter(d => d.type === 'entity').map(d => d.name).join('\n'),
            this.data.title + '\n' + this.data.data.filter(d => d.type === 'entity').map(d => d.name).join('\n')
        ].join('\n\n')
    }
}

// ==============STEP 3=================

class Step3_1 extends NormStep {
    loadFromStep(lastStepData) {
        this.data = {
            pk: '',
            fks: [],
            title: lastStepData.title,
            data: lastStepData.data.filter(d => d.type === 'entity').map(d => d.name)
        }
    }

    setContent(contentDiv) {
        contentDiv.innerHTML = ''
        contentDiv.appendChild(simpleHeader('Step 3.1-3.2', 'Select the primary key and mark repeating groups'))
        const table = simpleTable(this.data.title, this.data.data,
            (name) => {
                if (name === this.data.pk) {
                    return '<u>' + name + '</u>'
                }
                return name
            },
            {
                PK: {
                    value: (name) => {
                        return this.data.pk === name
                    },
                    onvalue: (name, value) => {
                        if (value)
                            this.data.pk = name
                        else
                            this.data.pk = ''
                        this.setContent(contentDiv)
                    }
                },
                FK: {
                    value: (name) => {
                        return this.data.fks.includes(name)
                    },
                    onvalue: (name, value) => {
                        if (!this.data.fks.includes(name) && value) {
                            this.data.fks.push(name)
                        }
                        else if (this.data.fks.includes(name) && !value) {
                            this.data.fks.splice(this.data.fks.indexOf(name), 1)
                        }
                        this.setContent(contentDiv)
                    }
                }
            })
        contentDiv.appendChild(table)
    }

    createUI() {
        const contentDiv = document.createElement('div')
        this.setContent(contentDiv)
        return contentDiv
    }
}

class Step3_3 extends NormStep {

}

class Step3_4 extends NormStep {

}

class Step3_5 extends NormStep {

}

class Step3_6 extends NormStep {

}

// ==============STEP 4=================

class Step4_1 extends NormStep {

}

class Step4_2 extends NormStep {

}

class Step4_3 extends NormStep {

}

class Step4_4 extends NormStep {

}

class Step4_5 extends NormStep {

}

// ==============STEP 5=================

class Step5_1 extends NormStep {

}

class Step5_2 extends NormStep {

}

class Step5_3 extends NormStep {

}

class Step5_4 extends NormStep {

}

class Step5_5 extends NormStep {

}

export function createStepList() {
    return [
        new Step1_1(),
        new Step1_2(),
        new Step2(),
        new Step3_1(),
        new Step3_3(),
        new Step3_4(),
        new Step3_5(),
        new Step3_6(),
        new Step4_1(),
        new Step4_2(),
        new Step4_3(),
        new Step4_4(),
        new Step4_5(),
        new Step5_1(),
        new Step5_2(),
        new Step5_3(),
        new Step5_4(),
        new Step5_5()
    ]
}
