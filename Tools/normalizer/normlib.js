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
        this.data = {title: '', data: lastStepData}
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

}

class Step3_2 extends NormStep {

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
        new Step3_2(),
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
