const accordions = document.querySelectorAll('accordion')

for (const accordion of accordions) {
    const title = accordion.querySelector('accordion-title')
    const content = accordion.querySelector('accordion-content')

    title.addEventListener('click', () => {
        content.classList.toggle('visible')
        title.classList.toggle('open')
    })
}
