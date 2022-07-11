var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//use the smallest size for design
//iPhone 12	390 x 844
c.width = 844;
c.height = 390;

/* window.addEventListener("resize", function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}); */

/* var mouse = { x: c.width / 2, y: c.height / 2 }

window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}); */

let key = ""
let PianoKeys = []
let Notes = []

//Game setting
const pianoKeyHeight = 30
const noteHeight = 30
const noteColor = 'black'
const gridLineColor = 'gray'

//hue 1-300 color code

window.addEventListener("keydown", function (event) {
    key = event.code
    switch (key) {
        case "KeyQ":
            console.log(key)
            PianoKeys.push(new pianoKey(0, c.height, 0))
            break;
        case "KeyW":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 1, c.height, 30))
            break;
        case "KeyE":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 2, c.height, 60))
            break;
        case "KeyR":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 3, c.height, 90))
            break;
        case "KeyT":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 4, c.height, 120))
            break;
        case "KeyY":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 5, c.height, 150))
            break;
        case "KeyU":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 6, c.height, 180))
            break;
        case "KeyI":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 7, c.height, 210))
            break;
        case "KeyO":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 8, c.height, 240))
            break;
        case "KeyP":
            console.log(key)
            PianoKeys.push(new pianoKey(c.width / 10 * 9, c.height, 270))
            break;
    }
})

class pianoKey {
    constructor(x, y, hue) {
        this.position = {
            x: x,
            y: y - pianoKeyHeight
        }
        this.color = 'hsl(' + hue + ', 100%, 75%)'
        this.width = c.width / 10
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
    for (var i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.strokeStyle = gridLineColor
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
    console.log(Notes.length)
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

        //

        for (var i = 0; i < PianoKeys.length; i++) {
            for (var j = 0; j < Notes.length; j++) {
                if (boxCollision(PianoKeys[i], Notes[j]) === true) {
                    Notes.splice(j, 1)
                    j--
                }
            }
        }

        drawGridLine()

    }, 1000 / fps)
}

animate()
init()