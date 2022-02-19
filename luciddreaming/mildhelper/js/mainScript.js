const lines = [//The lines for the mantra
    "I will know when i'm dreaming",
    "I am dreaming",
    "I will go to sleep and wake up lucid",
    "I will become lucid in my dreams",
    "I will Lucid Dream tonight",
    "I will realise i am dreaming",
    "I can lucid dream",
    "I will wake up in a dream",
]

const count = 7;

const currentLine = document.getElementById("currentline")

const items = []
for (let i = 0; i < count; i++) {
    items.push(document.getElementById(`nextup${i}`))
}
function randomLine() {
    return lines[Math.floor(Math.random()*lines.length)]
}

for (let i = 0, item, item2; i < items.length, item = items[i]; i++) {
    item.innerText = randomLine()
}

function next(){
    currentLine.innerText = items[0].innerText
    for (let i = 0, item, item2; i < items.length - 1, item = items[i], item2 = items[i+1]; i++) {
        item.innerText = item2.innerText
    }
    items[items.length-1].innerText = randomLine()
    setTimeout(next, 2000)
}
next()


const notificationChecks = [
    "Remember to do reality checks",
    "Remember to write down your dreams",
    "Anything is possible in your dreams",
    "You can always try again tomorrow",
    "\"good night good luck\"",
]
function getNotification(){
    return notificationChecks[Math.floor(Math.random()*notificationChecks.length)]
}
const notificationObj = document.getElementById('notification')
function notification(){
    notificationObj.style.opacity = "0%"
    setTimeout(notificationShow, 10000 + Math.floor(Math.random() * 10000))//min 10 seconds, max 20
}
function notificationShow(){
    notificationObj.innerText = getNotification()
    notificationObj.style.opacity = "100%"
    setTimeout(notification, 3000)
}
notification()