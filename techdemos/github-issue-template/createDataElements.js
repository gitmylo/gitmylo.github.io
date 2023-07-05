import {allTypes} from "./field.js"

document.data = {}
const data = document.data

class dataElement {
    static string(id, displayName, defaultValue, element) {
        if (displayName === undefined) displayName = id
        const label = document.createElement('label')
        label.innerText = displayName + ': '
        const input = document.createElement('input')
        input.type = 'text'

        data[id].value = defaultValue
        input.value = defaultValue

        input.addEventListener('change', () => {
            data[id].value = input.value
        })

        label.appendChild(input)
        element.appendChild(label)
    }

    static strlist(id, displayName, defaultValue, element) {
        if (displayName === undefined) displayName = id
        const items = [...defaultValue.matchAll(/"(.*?)"/gm)].map(a => a[1])

        data[id].value = items

        const label = document.createElement('div')
        label.innerText = displayName + ":"
        label.innerHTML += '<br>'
        const ul = document.createElement('ul')
        for (const item of items) {
            const li = document.createElement('li')
            li.classList.add('li')
            li.innerText = item

            li.addEventListener('click', () => {
                li.remove()
                data[id].value.splice(data[id].value.indexOf(item, 1))
            })
            ul.appendChild(li)
        }
        label.appendChild(ul)
        const addbox = document.createElement('div')
        const addinput = document.createElement('input')
        const addbutton = document.createElement('button')
        addinput.type = 'text'
        addbutton.innerText = 'Add'

        const add = () => {
            const name = addinput.value
            addinput.value = ''
            data[id].value.push(name)
            const li = document.createElement('li')
            li.classList.add('li')
            li.innerText = name

            li.addEventListener('click', () => {
                li.remove()
                data[id].value.splice(data[id].value.indexOf(name, 1))
            })
            ul.appendChild(li)
        }

        addbutton.addEventListener('click', add)
        addinput.addEventListener('keydown', e => {if (e.key === 'Enter') add()})

        addbox.appendChild(addinput)
        addbox.appendChild(addbutton)

        label.appendChild(addbox)

        element.appendChild(label)
    }

    static body(id, displayName, defaultValue, element) {
        if (displayName === undefined) displayName = id

        data[id].value = []

        const title = document.createElement('h1')
        title.innerText = displayName + ":"
        element.appendChild(title)
        const contentDiv = document.createElement('div')
        element.appendChild(contentDiv)
        const addDiv = document.createElement('div')
        const addButton = document.createElement('button')
        addButton.id = 'add-button'
        addDiv.classList.add('small', 'add-div')
        addButton.addEventListener('click', () => {
            addButton.parentElement.classList.toggle('small')
        })
        addDiv.appendChild(addButton)

        for (const type in allTypes) {
            const addButton = document.createElement('button')
            addButton.innerText = type
            addButton.addEventListener('click', () => {
                data[id].value.push(new allTypes[type](contentDiv, data[id].value))
            })
            addDiv.appendChild(addButton)
        }

        element.appendChild(addDiv)
    }

    static create(id, displayName, defaultValue, element) {
        if (displayName === undefined) displayName = id
        element.innerHTML = ''

        const button = document.createElement('button')
        button.innerText = displayName

        button.addEventListener('click', () => {
            const labelsStr = data.labels.value.length == 0 ? '' : `"${data.labels.value.map(a => a.replaceAll('"', '\\"')).join('", "')}"`
            const outStr = `# Created with https://gitmylo.github.io/techdemos/github-issue-template
name: ${data.name.value}
description: ${data.description.value}
title: "${data.title.value.replaceAll('"', '\\"')}"
labels: [${labelsStr}]
${jsyaml.dump({assignees: data.assignees.value})}${jsyaml.dump({body: data.body.value.map(a => a.toJson())})}`
            navigator.clipboard.writeText(outStr)
            button.innerText = 'copied to clipboard!'
            setTimeout(() => {
                button.innerText = displayName
            }, 2000)
            // console.log(window.jsyaml.dump(data))
            // alert(JSON.stringify(data))
        })

        element.appendChild(button)
    }
}

export function createDataElements() {
    for (const el of document.querySelectorAll('[data-type]')) {
        data[el.id] = {type: el.dataset.type, value: null}
        const defaultValue = el.innerHTML
        el.innerHTML = ''
        dataElement[el.dataset.type](el.id, el.dataset.displayName, defaultValue, el)
    }
}