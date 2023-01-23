/**
 * @type {HTMLInputElement}
 */
var inputBox = document.getElementById("inputBox")
/**
 * @type {HTMLInputElement}
 */
var startVolume = document.getElementById("startVolume")
/**
 * @type {HTMLInputElement}
 */
var stepVolume = document.getElementById("stepVolume")

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '73NTc2mncoU',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': e => {},
            'onStateChange': e => {
                if (e.data === YT.PlayerState.ENDED) {
                    player.playVideo();//loop the video
                }
            }
        }
    })
}

inputBox.addEventListener("keyup", e => {
    /**
     * @type string
     */
    let value = inputBox.value
    value = value.replaceAll("https://www.youtube.com/watch?v=", "")
    value = value.replaceAll("https://www.youtube.com/embed/", "")
    value = value.split("&")[0]
    value = value.trim()
    inputBox.value = value

    player.loadVideoById(value)
})

function setVolume(volume) {
    player.setVolume(volume)
}

var interval, volume

function start() {
    volume = parseFloat(startVolume.value)
    interval = setInterval(step, parseFloat(stepVolume.value) * 1000)
}

function step() {
    if (volume > 0) {
        volume -= 1
        console.log(`Volume down to ${volume}%`)
        setVolume(volume)
    }
    else {
        setVolume(0)
        console.log("Done!")
        clearInterval(interval)
    }
}

function stop() {
    setVolume(100)
    clearInterval(interval)
}