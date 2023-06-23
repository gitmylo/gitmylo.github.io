const dataactions = document.querySelectorAll('[data-action]')
const promptBox = document.getElementById('prompt')

for (const dataaction of dataactions) {
    dataaction.addEventListener('click', () => {
        switch (dataaction.dataset.action) {
            case 'setprompt':
                promptBox.value = dataaction.innerHTML
                break
        }
    })
}
