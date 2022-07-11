var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//use the smallest size for design
c.width = 800;
c.height = 600;

/* window.addEventListener("resize", function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}); */

/* var mouse = { x: c.width / 2, y: c.height / 2 }
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}); */

//Game setting
const pianoKeyHeight = 30
const noteHeight = 30
const noteColor = 'black'
const gridLineColor = 'gray'

let score = 0
let key = ""
let PianoKeys = []
let Notes = []

let playSound = () => new Audio('./video/SawanoHiroyuki[nZk]Laco「Hands Up to the Sky」Music Video ８６―エイティシックス― ver..mp4').play()

//hue 1-300 color code

window.addEventListener("keydown", function (event) {
    key = event.code
    switch (key) {
        case "KeyQ":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1, c.height, 0))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_004_54846.mp3').play()
            break;
        case "KeyW":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 1, c.height, 30))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_005_54847.mp3').play()
            break;
        case "KeyE":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 2, c.height, 60))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_004_54846.mp3').play()
            break;
        case "KeyR":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 3, c.height, 90))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_005_54847.mp3').play()
            break;
        case "KeyT":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 4, c.height, 120))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_004_54846.mp3').play()
            break;
        case "KeyY":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 5, c.height, 150))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_005_54847.mp3').play()
            break;
        case "KeyU":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 6, c.height, 180))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_004_54846.mp3').play()
            break;
        case "KeyI":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 7, c.height, 210))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_005_54847.mp3').play()
            break;
        case "KeyO":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 8, c.height, 240))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_004_54846.mp3').play()
            break;
        case "KeyP":
            console.log(key)
            playerObjectLimited()
            PianoKeys.push(new pianoKey(1 + c.width / 10 * 9, c.height, 270))
            new Audio('./video/zapsplat_musical_drum_tom_set_down_005_54847.mp3').play()
            break;
    }
})

function playerObjectLimited() {
    if (PianoKeys.length < 4) return
    PianoKeys.shift()
}

class pianoKey {
    constructor(x, y, hue) {
        this.position = {
            x: x,
            y: y - pianoKeyHeight
        }
        this.color = 'hsl(' + hue + ', 100%, 75%)'
        //avoid tragger next col, left right per 1 distance
        this.width = c.width / 10 - 2
        this.height = pianoKeyHeight
        this.time = 30
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()
        this.time--
    }
}

class note {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.color = noteColor
        this.width = c.width / 10
        this.height = noteHeight
        this.velocity = {
            x: 0,
            y: 10
        }
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
    }
}

function boxCollision(object1, object2) {
    if (
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height
    )
        return true
}

function init() {
    for (var i = 0; i < beats.length; i++) {
        (function (i) {
            setTimeout(() => {
                for (var j = 0; j < beats[i].length; j++) {
                    if (beats[i][j] === 1) {
                        Notes.push(new note(j * c.width / 10, 0 - noteHeight))
                    }
                }
            }, 100 * i)
        })(i)
    }
}

function drawGridLine() {
    for (var i = 0; i <= 10; i++) {
        ctx.beginPath()
        ctx.strokeStyle = gridLineColor
        ctx.lineWidth = 2
        ctx.moveTo(i * (c.width / 10), 0)
        ctx.lineTo(i * (c.width / 10), c.height)
        ctx.stroke()
        ctx.closePath()
    }
}

function noteOverScreen() {
    for (var i = 0; i < Notes.length; i++) {
        if (Notes[i].position.y >= c.height) {
            Notes.splice(i, 1)
            i--
        }
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText('score: ' + score, c.width / 2, 50);
}

function Collision() {
    for (var i = 0; i < PianoKeys.length; i++) {
        for (var j = 0; j < Notes.length; j++) {
            if (boxCollision(PianoKeys[i], Notes[j]) === true) {
                Notes.splice(j, 1)
                score += 100
                console.log('hit')
                j--
            }
        }
    }
}

var fps = 120

function animate() {
    setTimeout(() => {

        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, c.width, c.height)



        Notes.forEach((object) => {
            object.update()
        })
        noteOverScreen()

        for (var j = 0; j < PianoKeys.length; j++) {
            PianoKeys[j].update()

            if (PianoKeys[j].time <= 0) {
                PianoKeys.splice(j, 1)
                j--
            }
        }

        Collision()

        drawGridLine()

        drawScore()

    }, 1000 / fps)
}

const startBtn = document.querySelector('.startBtn')
startBtn.addEventListener('click', () => {
    startBtn.classList.add('btnHidden')
    animate()
    init()
})