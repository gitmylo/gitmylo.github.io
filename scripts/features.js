const mmdProcessors = [
    {
        regex: /(?:\s*>>\s+.*\r?\n?)+/gm,
        process: r => {
            const items = []
            for (const match of r[0].matchAll(/(>>\s+(.*))/gm)){
                items.push(match[2])}
            if (items.length === 0) return r
            return "<div class='quote'>" + items.join(`<br>`) + '</div>'
        }
    },
    {
        regex: /(?:\s*>\s+.*\n?)+/gm,
        process: r => {
            const items = []
            for (const match of r[0].matchAll(/(>\s+(.*))/gm)){
                items.push(match[2])}
            if (items.length === 0) return r
            return "<div class='quote'>" + items.join(`<br>`) + '</div>'
        }
    },
    {
        regex: /```\r?\n?(.*?)```/gms,
        process: r => {
            return `<div class="code">${r[1]}</div>`
        }
    },
    {
        regex: /^\s*###### *(.*?)\r?\n/gm,
        process: r => {
            return `<h6>${r[1]}</h6>`
        }
    },
    {
        regex: /^\s*##### *(.*?)\r?\n/gm,
        process: r => {
            return `<h5>${r[1]}</h5>`
        }
    },
    {
        regex: /^\s*#### *(.*?)\r?\n/gm,
        process: r => {
            return `<h4>${r[1]}</h4>`
        }
    },
    {
        regex: /^\s*### *(.*?)\r?\n/gm,
        process: r => {
            return `<h3>${r[1]}</h3>`
        }
    },
    {
        regex: /^\s*## *(.*?)\r?\n/gm,
        process: r => {
            return `<h2>${r[1]}</h2>`
        }
    },
    {
        regex: /^\s*# *(.*?)\r?\n/gm,
        process: r => {
            return `<h1>${r[1]}</h1>`
        }
    },
    {
        regex: /(?:\s*[*+-]\s+.*\n?)+/gm, // Full list
        process: r => {
            const items = []
            for (const match of r[0].matchAll(/([*+-]\s+(.*))/gm)){
                items.push(match[2])}
            if (items.length === 0) return r
            return '<ul><li>' + items.join('</li><li>') + '</li></ul>'
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
        regex: /\[(.*?)\]\((.*?)\)/gm,
        process: r => {
            return `<a target="_blank" href="${r[2]}">${r[1]}</a>`
        }
    },
    {
        regex: /\r?\n/gm,
        process: r => {
            return `<br>`
        }
    }
]

export function miniMarkDown(input) {
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

function enableToolTips() {
    const allTooltipElements = document.querySelectorAll('[data-caption]')
    for (const tooltipElement of allTooltipElements) {
        let caption = tooltipElement.dataset.caption
        if (caption.startsWith('$'))
            caption = window.keydict[caption]
        const captionElement = document.createElement('div')
        captionElement.innerHTML = caption
        captionElement.hidden = true
        captionElement.classList.add('caption')

        tooltipElement.addEventListener('mouseover', async () => {
            captionElement.hidden = false
        })
        tooltipElement.addEventListener('mouseout', async () => {
            captionElement.hidden = true
        })
        tooltipElement.addEventListener('mousemove', async (ev) => {
            // captionElement.style.left = `${ev.clientX + 15}px`
            // captionElement.style.top = `${ev.clientY + 25}px`
            const br = tooltipElement.getBoundingClientRect()
            captionElement.style.left = `${br.right + 10}px`
            captionElement.style.top = `${br.top}px`
        })

        document.body.appendChild(captionElement)
    }
}

function tooManyTooltips() {
    const allTooltipElements = document.querySelectorAll('a[href]:not([href^="http"])')
    for (const tooltipElement of allTooltipElements) {
        const url = tooltipElement.href
        const iframeElement = document.createElement('iframe')
        iframeElement.height = '400'
        iframeElement.width = '600'
        iframeElement.hidden = true
        iframeElement.classList.add('caption')
        let load = false

        tooltipElement.addEventListener('mouseover', async () => {
            iframeElement.hidden = false
            if (!load) {
                iframeElement.contentWindow.location.replace(url)
                load = true
            }
        })
        tooltipElement.addEventListener('mouseout', async () => {
            iframeElement.hidden = true
        })
        tooltipElement.addEventListener('wheel', async (ev) => {
            iframeElement.contentWindow.scrollBy({left: ev.deltaX, top: ev.deltaY})
            ev.preventDefault()
        })
        tooltipElement.addEventListener('mousemove', async (ev) => {
            iframeElement.style.left = `${ev.clientX + 15}px`
            iframeElement.style.top = `${ev.clientY + 25}px`
            // const br = tooltipElement.getBoundingClientRect()
            // captionElement.style.left = `${br.right + 10}px`
            // captionElement.style.top = `${br.top}px`
        })

        document.body.appendChild(iframeElement)
    }
}

class drawLayer {
    savedParams
    constructor(params) {
        this.savedParams = params
    }

    static fromData(data) {
        let layerClass = drawLayer
        for (const l in layer){
            if (layer[l].name === data.name)
                layerClass = layer[l]
        }
        const l = new layerClass()
        l.savedParams = data.params
        if (data?.params)
            console.log(data.params)
        return l
    }

    saveData() {
        return {
            name: this.constructor.name,
            params: this.savedParams
        }
    }

    /**
     * @param canvas {CanvasRenderingContext2D}
     */
    draw(canvas) {}
}

class drawBundle {
    layers
    constructor(...layers) {
        this.layers = layers
    }
}

class colorLayer extends drawLayer {
    constructor(fill, stroke) {
        super({fill, stroke})
    }

    draw(canvas) {
        const p = this.savedParams
        if (p.fill)
            canvas.fillStyle = p.fill
        if (p.stroke)
            canvas.strokeStyle = p.stroke
    }
}

class lineLayer extends drawLayer {
    constructor(start, end, thickness=1) {
        super({start, end, thickness})
    }

    draw(canvas) {
        const p = this.savedParams
        canvas.lineWidth = p.thickness
        canvas.moveTo(...p.start)
        canvas.lineTo(...p.end)
        canvas.stroke()
    }
}

class circleLayer extends drawLayer {
    constructor(pos, rad, filled=false, from=0, to=2*Math.PI, thickness=1) {
        super({pos, rad, from, to, filled, thickness});
    }

    draw(canvas) {
        const p = this.savedParams
        canvas.lineWidth = p.thickness
        canvas.beginPath()
        canvas.arc(...p.pos, p.rad, p.from, p.to)
        if (p.filled)
            canvas.fill()
        else
            canvas.stroke()
        canvas.closePath()
    }
}

class rectLayer extends drawLayer {
    constructor(start, end) {
        super({start, end})
    }

    draw(canvas) {
        const p = this.savedParams
        const end = [...p.end]
        end[0] -= p.start[0]
        end[1] -= p.start[1]
        canvas.fillRect(...p.start, ...end)
    }
}

class textLayer extends drawLayer {
    constructor(pos, text, center=1, font='30px Arial') {
        super({pos, text, center, font});
    }

    draw(canvas) {
        const p = this.savedParams
        canvas.font = p.font
        const measurement = canvas.measureText(p.text)
        const pos = [...p.pos]
        pos[0] -= (((-p.center+1)*0.5)*measurement.width)
        canvas.fillText(p.text, ...pos)
    }
}

export const layer = {
    drawLayer,
    colorLayer,
    lineLayer,
    circleLayer,
    rectLayer,
    textLayer,

    drawBundle
}

export class Drawing {
    layers = []
    /**
     * @type {HTMLCanvasElement}
     */
    canvas
    /**
     * @type {CanvasRenderingContext2D}
     */
    context

    constructor(width, height, background=null) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        if (background !== null) this.canvas.style.background = background
        this.background = background
        this.context = this.canvas.getContext('2d')
    }
    
    draw() {
        const c = this.context
        c.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const layer of this.layers) {
            layer.draw(c)
        }
        return this
    }

    addLayer(layer) {
        if (layer.name !== undefined && layer.name.endsWith('Bundle'))
            this.layers.push(...layer.layers)
        else
            this.layers.push(layer)
        return this
    }

    saveJson() {
        return JSON.stringify({width: this.canvas.width, height: this.canvas.height, background: this.background, layers: this.layers.map(l => l.saveData())})
    }

    static drawingFromJson(json) {
        const data = JSON.parse(json)
        const drawing = new Drawing(data.width, data.height, data.background)
        drawing.layers = data.layers.map(l => drawLayer.fromData(l))
        return drawing
    }
}

export class previewBuilder {
    blocks = []
    constructor(title) {
        this.html(title, 'h1')
    }

    html(content, el='div') {
        const element = document.createElement(el)
        element.innerHTML = content
        this.blocks.push(element)
        return this
    }

    plain(content, el='div') {
        const element = document.createElement(el)
        element.innerText = content
        this.blocks.push(element)
        return this
    }

    markdown(content, el='div') {
        return this.html(miniMarkDown(content.trim()+'\n'), el)
    }

    build(key) {
        if (!window.keydict)
            window.keydict = {}
        const tempEl = document.createElement('div')
        for (const block of this.blocks) {
            tempEl.appendChild(block)
        }
        window.keydict[key] = tempEl.innerHTML
    }
}

export const features = {
    enableToolTips,
    tooManyTooltips
}