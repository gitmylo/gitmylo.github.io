import {PNG} from "pngjs";
import Buffer from "pngjs/browser";


/**
 * @type {HTMLInputElement}
 */
const file = document.getElementById('file')
const image = document.getElementById('image')

file.addEventListener('change', e => {
    const fileObj = e.target.files[0]
    let reader = new FileReader();
    reader.onload = (f) => {
        image.src = f.target.result
        const binary = atob(image.src.split(',')[1])
        const png = PNG.sync.read(Buffer.from(binary, 'binary'))
        const metadata = png.data.toString().split('\n')
        console.log(metadata)
    }
    reader.readAsDataURL(fileObj)
})
