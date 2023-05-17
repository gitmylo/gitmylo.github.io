const x = 64
const y = 64

const sphereParent = document.getElementById('sphereParent')

for (let xv = 0; xv < x; xv++) {
    for (let yv = 0; yv < y; yv++) {
        const el = document.createElement('div')
        el.classList.add(`side${xv}-${yv}`)
        sphereParent.appendChild(el)
    }
}
