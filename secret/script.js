(async () => {

    /**
     * @type {[{regex: RegExp, process: function(String[])}]}
     */
    const mmdProcessors = [
        {
            regex: /```\r?\n?(.*?)```/gms,
            process: r => {
                return `<div class="code">${r[1]}</div>`
            }
        },
        {
            regex: /^###### *(.*?)\r\n/gm,
            process: r => {
                return `<h6>${r[1]}</h6>`
            }
        },
        {
            regex: /^##### *(.*?)\r\n/gm,
            process: r => {
                return `<h5>${r[1]}</h5>`
            }
        },
        {
            regex: /^#### *(.*?)\r\n/gm,
            process: r => {
                return `<h4>${r[1]}</h4>`
            }
        },
        {
            regex: /^### *(.*?)\r\n/gm,
            process: r => {
                return `<h3>${r[1]}</h3>`
            }
        },
        {
            regex: /^## *(.*?)\r\n/gm,
            process: r => {
                return `<h2>${r[1]}</h2>`
            }
        },
        {
            regex: /^# *(.*?)\r\n/gm,
            process: r => {
                return `<h1>${r[1]}</h1>`
            }
        },
        {
            regex: /(?:\*{2}|__)(.*?)(?:\*{2}|__)/gm,
            process: r => {
                return `<b>${r[1]}</b>`
            }
        },
        {
            regex: /(?:\*|_)(.*?)(?:\*|_)/gm,
            process: r => {
                return `<i>${r[1]}</i>`
            }
        },
        {
            regex: /^>> *(.*?)\r\n/gm,
            process: r => {
                return `<div class="quote2">${r[1]}</div>`
            }
        },
        {
            regex: /^> *(.*?)\r\n/gm,
            process: r => {
                return `<div class="quote">${r[1]}</div>`
            }
        },
        {
            regex: /\[(.*?)\]\((.*?)\)/gm,
            process: r => {
                return `<a target="_blank" href="${r[2]}">${r[1]}</a>`
            }
        },
        {
            regex: /\r\n/gm,
            process: r => {
                return `<br>`
            }
        }
    ]

    const accordions = [
        {
            title: "Intro + TW",
            content: await loadContent("intr.0"),
            isHtml: false
        },
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

    function miniMarkDown(input) {
        const completedMatches = []
        for (const mmdProcessor of mmdProcessors) {
            for (const match of input.matchAll(mmdProcessor.regex)) {
                if (completedMatches.includes(match[0])) continue
                completedMatches.push(match[0])
                const newMatch = mmdProcessor.process(match)
                input = input.replaceAll(match[0], newMatch)
            }
        }
        return input
    }
})()