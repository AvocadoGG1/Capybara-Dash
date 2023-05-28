import platform from '../img/platform.png'
import trees from '../img/trees.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import spriteStandLeft from '../img/spriteStandLeft.png'
import spriteStandRight from '../img/spriteStandRight.png'
import spriteMunchLeft from '../img/spriteMunchLeft.png'
import spriteMunchRight from '../img/spriteMunchRight.png'
import orange from '../img/orange.png'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

var counter = 0; // declare a global counter variable
var speed = 10; // declare a global speed variable that controls how often the animation updates

const gravity = 0.5
class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 128
        this.height = 128

        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
            stand : {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft)
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft)
            },
            munch: {
                right: createImage(spriteMunchRight),
                left: createImage(spriteMunchLeft)
            }
        }

        this.currentSprite = this.sprites.stand.right
    }
    draw() {
        c.drawImage(
           this.currentSprite,
           64 * this.frames,
           0,
           64,
           54,
           this.position.x,
           this.position.y,
           this.width,
           this.height)
    }

    update() {
        counter++; // increment the counter every frame
        if (counter % speed == 0) { // check if the counter is divisible by the speed
            this.frames++; // update the animation only when the condition is true
            if (this.frames > 7) this.frames = 0;
          }
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}


let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

let player = new Player()

let platforms = [
    new Platform({
        x: -1,
        y: 470,
        image: platformImage
    }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage })
]


let genericObjects = [


]


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function init() {
    platformImage = createImage(platform)

    player = new Player()

    platforms = [
        new Platform({
            x: -1,
            y: 470,
            image: platformImage
        }),
        new Platform({ x: platformImage.width * 4 + 300 + platformImage.width - platformSmallTallImage.width, y: 260, image: createImage(platformSmallTall) }),
        new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 2 -3, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 4 + 300, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 5 + 950, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 6 + 1500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 7 + 1800, y: 350, image: platformImage }),
        new Platform({ x: platformImage.width * 8 + 2100, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 9 + 2500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 10 + 2900, y: 400, image: platformImage }),
        new Platform({ x: platformImage.width * 11 + 3200, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 12 + 3600, y: 350, image: platformImage }),
        new Platform({ x: platformImage.width * 13 + 3900, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 14 + 4200, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 15 + 4500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 16 + 4800, y: 350, image: platformImage }),
        new Platform({ x: platformImage.width * 17 + 5100, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 18 + 5500, y: 400, image: platformImage }),
        new Platform({ x: platformImage.width * 19 + 5800, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 20 + 6200, y: 350, image: createImage(platformSmallTall) }),
        new Platform({ x: platformImage.width * 21 + 6500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 22 + 6800, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 23 + 7100, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 24 + 7500, y: 350, image: platformImage }),
        new Platform({ x: platformImage.width * 24 + 7580, y: -100, image: createImage(orange)})
    ]

    genericObjects = [
        new GenericObject({
            x: 0,
            y: 0,
            image: createImage(background)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(trees)
        })

    ]

    scrollOffset = 0

}



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.draw()
                platform.position.x -= player.speed
            })
            genericObjects[1].position.x -= player.speed * .66;

        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.draw()
                platform.position.x += player.speed
            })
            genericObjects[1].position.x += player.speed * .66;

        }
    }

    console.log(scrollOffset)
        // platform collision detection
    platforms.forEach(platform => {
            if (player.position.y + player.height < +platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
                player.velocity.y = 0
            }
        })
        // win condition
    if (scrollOffset > 23280) {
        console.log('you win!!')
        // display text on canvas
        c.font = "48px serif"; // set font size and style
        c.fillStyle = "black"; // set text color
        c.textAlign = "center"; // set text alignment
        c.fillText("You won, have an orange!", canvas.width/2, canvas.height/2); // draw text at the center of the canvas

    }

    // lose condition
    if (player.position.y > canvas.height) {
        // display text on canvas
        c.font = "48px serif"; // set font size and style
        c.fillStyle = "black"; // set text color
        c.textAlign = "center"; // set text alignment
        c.fillText("Died", canvas.width/2, canvas.height/2); // draw text at the center of the canvas
        setTimeout(function() {
            // call init() after 2 seconds
            init();
          }, 1000);
    }
}

init()
animate()

let isJumping = false;

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            break
        case 83:
            console.log('down')
            player.currentSprite = player.sprites.munch.right
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            break
        case 87:
            console.log('up')
            if (!isJumping && player.velocity.y === 0) { // Check if not already jumping and on the ground
                player.velocity.y -= 15
                isJumping = true; // Set the jump status to true
            }
            break
    }

})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            break
        case 83:
            console.log('down')
            player.currentSprite = player.sprites.stand.right
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            break
        case 87:
            console.log('up')
            isJumping = false; // Reset the jump status to false when the "up" key is released
            break
    }

})