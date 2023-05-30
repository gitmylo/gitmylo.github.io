import {miniMarkDown} from "../scripts/features.js"

(async () => {
    const accordions = [
        {
            title: "Markdown test",
            content: await loadContent("mark.down"),
            isHtml: false
        },
        {
            title: "Music quotes",
            content: await loadContent("mq.1"),
            isHtml: false
        },
        {
            title: "Wow",
            content: await loadContent("pleaseletit.end"),
            isHtml: false
        }
    ]

    async function loadContent(filename) {
        let response = "ERROR failed to get content"
        await fetch(`texts/${filename}`).then(r => {
            response = r.status === 200 ? r.text() : `ERROR code ${r.status}: ${r.statusText}`
        })
        return response
    }

    const holder = document.getElementById("holder")

    for (const accordion of accordions) {
        let accordionEl = document.createElement("div")
        accordionEl.classList.add("accordion")

        let accordionTitleEl = document.createElement("h1")
        accordionTitleEl.classList.add("accordionItem")
        accordionTitleEl.innerText = accordion.title
        accordionEl.appendChild(accordionTitleEl)

        let accordionContentEl = document.createElement("div")
        accordionContentEl.classList.add("accordionContent")
        if (accordion.isHtml) accordionContentEl.innerHTML = accordion.content
        else {
            accordionContentEl.innerHTML = miniMarkDown(decodeURI(accordion.content))
        }
        accordionEl.appendChild(accordionContentEl)

        holder.appendChild(accordionEl)
    }

    for (const accordionItem of document.getElementsByClassName("accordionItem")) {
        accordionItem.addEventListener("click", e => {
            accordionItem.parentElement.classList.toggle("open")
        })
    }
})()