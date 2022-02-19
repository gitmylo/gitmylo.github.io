const titles = ["Am i dreaming?", "I am dreaming", "I am lucid", "I am aware i am dreaming", "I will become lucid"]
function randomTitle() {
    return titles[Math.floor(Math.random()*titles.length)]
}

function loop() {
    document.title = randomTitle()
    setTimeout(loop, 5000)
}
loop()