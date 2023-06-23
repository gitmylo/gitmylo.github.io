const databinds = document.querySelectorAll('[data-databind]')

document.data = JSON.parse(window.localStorage.getItem('binds')) ?? {}

for (const databind of databinds) {
    const name = databind.dataset.databind
    if (name in document.data)
        if (databind.type === 'checkbox')
            databind.checked = document.data[name]
        else
            databind.value = document.data[name]
    else {
        document.data[name] = (databind.type === 'checkbox') ? databind?.checked : databind?.value
        save()
    }
    databind.addEventListener('change', () => {
        document.data[name] = (databind.type === 'checkbox') ? databind?.checked : databind?.value
        save()
    })
}

function save(){
    window.localStorage.setItem('binds', JSON.stringify(document.data))
}
