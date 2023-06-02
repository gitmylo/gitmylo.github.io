const data = createStepList()
let stepIndex = 0
let totalSteps = data.length

import {createStepList} from "./normlib.js"

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const astext = document.getElementById('astext')
const step = document.getElementById('step')
const editor = document.getElementById('editor')


function updateStep(newStep) {
    newStep = Math.min(totalSteps, Math.max(0, newStep))
    if (newStep > stepIndex) data[newStep].loadFromStep(data[newStep-1].data)
    stepIndex = newStep
    step.innerText = stepIndex
    editor.innerHTML = ''
    editor.appendChild(data[newStep].createUI())
}

function nextFunc() {
    updateStep(stepIndex+1)
}

function prevFunc() {
    updateStep(stepIndex-1)
}

prev.addEventListener('click', prevFunc)
next.addEventListener('click', nextFunc)
astext.addEventListener('click', () => {
    alert(data.map(d => d.toText()).join('\n\n'))
})

updateStep(0)
