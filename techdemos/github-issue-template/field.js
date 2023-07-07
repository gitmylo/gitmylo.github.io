class Field {
    static yamlRep = ''
    constructor(parentDiv, contentList) {
        this.createDefault()
        this.parentDiv = parentDiv
        this.contentList = contentList
        this.element = this.createElement()
        parentDiv.appendChild(this.element)
    }

    createDefault() {
        this.type = this.constructor.yamlRep
        this.attributes = this.defaultAttributes()
        this.validations = {
            required: false
        }
    }

    defaultAttributes() {
        return {}
    }

    toJson() {}

    /**
     * @returns {HTMLElement} The element representing this field.
     */
    createElement() {
        const [holder, content] = this.createElementInternal()
        content.innerText = 'Test element!'
        return holder
    }

    createElementInternal() {
        const holder = document.createElement('div')
        holder.classList.add('field', this.constructor.yamlRep)
        const [parent, content] = this.createControlButtons(this.contentList, holder)
        holder.appendChild(parent)
        return [holder, content]
    }

    /**
     * @param contentList {Field[]}
     * @returns {[HTMLDivElement, HTMLDivElement]}
     */
    createControlButtons(contentList, holder) {
        const controlDiv = document.createElement('div')
        controlDiv.classList.add('control-buttons')
        controlDiv.appendChild(this.createUpButton(contentList))
        controlDiv.appendChild(this.createDownButton(contentList))
        const titleEl = document.createElement('div')
        titleEl.innerText = " " + this.constructor.yamlRep
        titleEl.classList.add('inline')
        titleEl.addEventListener('mousedown', () => {
            controlDiv.parentElement.classList.toggle('show')
        })
        controlDiv.appendChild(titleEl)
        const buttons = document.createElement('div')
        buttons.classList.add('control-buttons-b')
        if (this.constructor.yamlRep !== 'markdown') buttons.appendChild(this.createIdBox())
        buttons.appendChild(this.createRemoveButton(contentList))
        controlDiv.appendChild(buttons)

        const contentDiv = document.createElement('div')
        contentDiv.classList.add('elem-content')
        holder.appendChild(contentDiv)
        return [controlDiv, contentDiv]
    }

    /**
     * @param contentList {Field[]}
     * @returns {HTMLButtonElement}
     */
    createRemoveButton(contentList) {
        const remove = () => {
            contentList.splice(contentList.indexOf(this), 1)
            this.element?.remove()
        }
        const removeButton = document.createElement('button')
        removeButton.classList.add('small-button')
        removeButton.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.00714L8.99286 0L5 3.99286L1.00714 0L0 1.00714L3.99286 5L0 8.99286L1.00714 10L5 6.00714L8.99286 10L10 8.99286L6.00714 5L10 1.00714Z" fill="black"/></svg>`
        removeButton.addEventListener('click', remove)

        return removeButton
    }

    /**
     * @param contentList {Field[]}
     * @returns {HTMLButtonElement}
     */
    createUpButton(contentList) {
        const up = () => {
            const oldIndex = contentList.indexOf(this)
            const newIndex = Math.max(0, oldIndex - 1)
            const el = contentList.splice(oldIndex, 1)[0]
            contentList.splice(newIndex, 0, el)
            const elAtOldIndex = contentList?.[oldIndex]?.element
            el.element.parentElement.insertBefore(el.element, elAtOldIndex)
        }
        const upButton = document.createElement('button')
        upButton.classList.add('small-button')
        upButton.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.5L5 2.5L10 7.5H0Z" fill="black"/></svg>`
        upButton.addEventListener('click', up)

        return upButton
    }

    /**
     * @param contentList {Field[]}
     * @returns {HTMLButtonElement}
     */
    createDownButton(contentList) {
        const down = () => {
            const oldIndex = contentList.indexOf(this)
            const newIndex = Math.min(contentList.length, oldIndex + 1)
            const elAtOldIndex = contentList?.[newIndex+1]?.element
            const el = contentList.splice(oldIndex, 1)[0]
            contentList.splice(newIndex, 0, el)
            el.element.parentElement.insertBefore(el.element, elAtOldIndex)
        }
        const downButton = document.createElement('button')
        downButton.classList.add('small-button')
        downButton.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5L5 7.5L10 2.5H0Z" fill="black"/></svg>`
        downButton.addEventListener('click', down)

        return downButton
    }

    createIdBox() {
        const idBox = document.createElement('input')
        idBox.type = 'text'
        idBox.placeholder = 'Id (Or empty for none)'
        idBox.pattern = '[a-zA-Z0-9-_]*'
        idBox.addEventListener('change', () => {
            idBox.classList.toggle('invalid', idBox.validity.patternMismatch)
            this.id = idBox.value || undefined
        })
        return idBox
    }

    createDynamicInput(linkedObj, linkedValue, name, inputType, removeIfEmpty=true, extra = {}) {
        const p = document.createElement('p')
        const label = document.createElement('label')
        label.innerText += name + ': '
        const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input')
        input.classList.add('wide-input')
        if (inputType !== 'textarea') input.type = inputType
        else input.classList.add('noresize-x')
        for (const key in extra) input[key] = extra[key]
        input[inputType === 'checkbox' ? 'checked' : 'value'] = this[linkedObj][linkedValue]
        input.addEventListener('change', () => {
            this[linkedObj][linkedValue] = inputType === 'checkbox' ? input.checked : (removeIfEmpty && !input.value ? undefined : input.value)
        })
        p.appendChild(label)
        p.appendChild(input)
        return p
    }

    createRequiredCheckbox() {
        return this.createDynamicInput('validations', 'required', 'required', 'checkbox')
    }
}

class MarkDown extends Field {
    static yamlRep = 'markdown'
    defaultAttributes() {
        return {
            value: ''
        }
    }

    toJson() {
        return {
            type: this.constructor.yamlRep,
            attributes: this.attributes
        }
    }

    createElement() {
        const [holder, content] = this.createElementInternal()
        const contentDiv = document.createElement('div')
        contentDiv.classList.add('grid-2')
        const inputBox = document.createElement('textarea')
        inputBox.classList.add('input', 'noresize-x', 'code')
        const previewBox = document.createElement('div')
        const md = new markdownit('default', {html: true, xhtmlOut: true, linkify: true})
        const regex = /\$(.*?)(?<!\\)\$/g
        inputBox.addEventListener('keyup', () => {
            let outval = md.render(inputBox.value)
            const matches = []
            for (const match of outval.matchAll(regex)) {
                console.log(match)
                if (!matches.includes(match[1])) {
                    matches.push(match[1])
                    outval = outval.replaceAll(match[0], katex.renderToString(match[1], {throwOnError: false}))
                }
            }
            previewBox.innerHTML = outval
            this.attributes.value = inputBox.value
        })
        contentDiv.appendChild(inputBox)
        contentDiv.appendChild(previewBox)
        content.appendChild(contentDiv)
        return holder
    }
}

class Input extends Field {
    static yamlRep = 'input'
    defaultAttributes() {
        return {
            label: '',
        }
    }

    toJson() {
        return {
            type: this.constructor.yamlRep,
            id: this.id,
            attributes: this.attributes,
            validations: this.validations
        }
    }

    createElement() {
        const [holder, content] = this.createElementInternal()
        content.appendChild(this.createRequiredCheckbox())
        content.appendChild(this.createDynamicInput('attributes', 'label', 'label', 'text', false))
        content.appendChild(this.createDynamicInput('attributes', 'description', 'description', 'text'))
        content.appendChild(this.createDynamicInput('attributes', 'placeholder', 'placeholder', 'text'))
        content.appendChild(this.createDynamicInput('attributes', 'value', 'value', 'text'))

        return holder
    }
}

class TextArea extends Field {
    static yamlRep = 'textarea'
    defaultAttributes() {
        return {
            label: ''
        }
    }

    toJson() {
        return {
            type: this.constructor.yamlRep,
            id: this.id,
            attributes: this.attributes,
            validations: this.validations
        }
    }

    createElement() {
        const [holder, content] = this.createElementInternal()
        content.appendChild(this.createRequiredCheckbox())
        content.appendChild(this.createDynamicInput('attributes', 'label', 'label', 'text', false))
        content.appendChild(this.createDynamicInput('attributes', 'description', 'description', 'text'))
        content.appendChild(this.createDynamicInput('attributes', 'placeholder', 'placeholder', 'text'))
        content.appendChild(this.createDynamicInput('attributes', 'value', 'value', 'textarea'))
        content.appendChild(this.createDynamicInput('attributes', 'render', 'render', 'text'))

        return holder
    }
}

class DropDown extends Field {
    static yamlRep = 'dropdown'
    defaultAttributes() {
        return {
            label: '',
            multiple: false,
            options: []
        }
    }

    toJson() {
        return {
            type: this.constructor.yamlRep,
            id: this.id,
            attributes: this.attributes,
            validations: this.validations
        }
    }

    createElement() {
        const [holder, content] = this.createElementInternal()
        content.appendChild(this.createRequiredCheckbox())
        content.appendChild(this.createDynamicInput('attributes', 'label', 'label', 'text', false))
        content.appendChild(this.createDynamicInput('attributes', 'description', 'description', 'text'))
        content.appendChild(this.createDynamicInput('attributes', 'multiple', 'multiple', 'checkbox'))

        const options = document.createElement('div')

        const label = document.createElement('div')
        label.innerText = 'options:'
        label.innerHTML += '<br>'
        const ul = document.createElement('ul')
        label.appendChild(ul)

        const addbox = document.createElement('div')
        const addinput = document.createElement('input')
        const addbutton = document.createElement('button')
        addinput.type = 'text'
        addbutton.innerText = 'Add'

        const add = () => {
            const name = addinput.value
            addinput.value = ''
            this.attributes.options.push(name)
            const li = document.createElement('li')
            li.classList.add('li')
            li.innerText = name

            li.addEventListener('click', () => {
                li.remove()
                this.attributes.options.splice(this.attributes.options.indexOf(name, 1))
            })
            ul.appendChild(li)
        }

        addbutton.addEventListener('click', add)
        addinput.addEventListener('keydown', e => {if (e.key === 'Enter') add()})

        addbox.appendChild(addinput)
        addbox.appendChild(addbutton)

        label.appendChild(addbox)

        options.appendChild(label)

        content.appendChild(options)

        return holder
    }
}

class CheckBoxes extends Field {
    static yamlRep = 'checkboxes'
    defaultAttributes() {
        return {
            label: '',
            options: []
        }
    }

    toJson() {
        return {
            type: this.constructor.yamlRep,
            id: this.id,
            attributes: this.attributes,
            validations: this.validations
        }
    }

    createElement() {
        const [holder, content] = this.createElementInternal()
        content.appendChild(this.createRequiredCheckbox())
        content.appendChild(this.createDynamicInput('attributes', 'label', 'label', 'text', false))
        content.appendChild(this.createDynamicInput('attributes', 'description', 'description', 'text'))

        const options = document.createElement('div')

        const label = document.createElement('div')
        label.innerText = 'options:'
        label.innerHTML += '<br>'
        const ul = document.createElement('ul')
        label.appendChild(ul)

        const addbox = document.createElement('div')
        const addinput = document.createElement('input')
        const addbutton = document.createElement('button')
        addinput.type = 'text'
        addbutton.innerText = 'Add'

        const add = () => {
            const name = addinput.value
            const obj = {label: name}
            addinput.value = ''
            this.attributes.options.push(obj)
            const li = document.createElement('li')
            li.classList.add('li')
            li.innerText = name

            li.addEventListener('click', () => {
                li.remove()
                this.attributes.options.splice(this.attributes.options.indexOf(obj, 1))
            })
            ul.appendChild(li)
        }

        addbutton.addEventListener('click', add)
        addinput.addEventListener('keydown', e => {if (e.key === 'Enter') add()})

        addbox.appendChild(addinput)
        addbox.appendChild(addbutton)

        label.appendChild(addbox)

        options.appendChild(label)

        content.appendChild(options)

        return holder
    }
}

export const allTypes = {MarkDown, Input, TextArea, DropDown, CheckBoxes}
