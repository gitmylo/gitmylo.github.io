import {API} from './lib/textgenapi.js'

const genButton = document.getElementById('generateButton')
const promptBox = document.getElementById('prompt')
const outputBox = document.getElementById('output')

const openaimodels = document.getElementById('openaimodels')

genButton.addEventListener('click', () => {
    API.generate(promptBox.value, outputBox)
})

document.getElementById('refreshopenaimodels').addEventListener('click', () => {
    openaimodels.innerHTML = ''
    const endpoint = document.data.openaiendpoint
    const regex = /.*v1\//gm
    let m
    if ((m = regex.exec(endpoint)) !== null) {
        const baseEndpoint = m[0]
        const modelEndpoint = baseEndpoint + 'models'
        fetch(modelEndpoint, {
            headers: {
                'Authorization': `Bearer ${document.data.openaikey}`
            }
        })
            .then(r => r.json())
            .then(r => {
                for (const model of r.data) {
                    const option = document.createElement('option')
                    option.value = model.id
                    option.innerText = model.id
                    openaimodels.appendChild(option)
                }
            })
    }
})
