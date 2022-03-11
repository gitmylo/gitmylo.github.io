/**
 * Raycaster made in javascript, using DOM manipulation.
 * @author GitMylo
 */

/**
 * Config
 */

/**
 * The amount of rays.
 * @type {number}
 */
const count = 100 //ray count
/**
 * The object containing pressed keys and mouse movements.
 *
 * New raw inputs get added with every key pressed.
 * @type    {{horizontal: number, rotation: number, raw: {}, vertical: number}}
 */
let inputs = {
    horizontal: 0,
    vertical: 0,
    rotation: 0,
    raw: {}
}
/**
 * The object representing the player.
 * @type {{x: number, y: number, angle: number, handleMovement: function, posToVec: function}}
 */
let player = {
    x: 2.5,
    y: 2.5,
    angle: 0,// in radians, for easier use
    handleMovement: null,
    posToVec: null
}
/**
 * An array containing the map, used with numbers here,
 * but as long as you put false, null or 0 in the empty spots the rest can be calculated.
 * @type {any[][]}
 */
let map = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
]

/**
 * Classes
 */

class Vector {
    /**
     * A representation of a point on a 2d plane.
     * @param x {number} The x coordinate.
     * @param y {number} The y coordinate.
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Add this vector to another.
     * @param other {Vector} The vector to add coordinates with.
     * @returns {Vector} the resulting vector.
     */
    add = (other) => {
        return new Vector(this.x + other.x, this.y + other.y)
    }
    /**
     * Subtract other from this vector.
     * @param other {Vector} The vector to subtract from this.
     * @returns {Vector} the resulting vector.
     */
    sub = (other) => {
        return new Vector(this.x - other.x, this.y - other.y)
    }
    /**
     * Multiply this vector with another vector or a number.
     * @param other {Vector | number} The vector to multiply with.
     * @returns {Vector} the resulting vector.
     */
    mul = (other) => {
        if (other.x && other.y) return new Vector(this.x * other.x, this.y * other.y)
        return new Vector(this.x * other, this.y * other)
    }
    /**
     * Divide this vector by another vector or a number.
     * @param other {Vector | number} The vector to divide by.
     * @returns {Vector} the resulting vector.
     */
    div = (other) => {
        if (other.x && other.y) return new Vector(this.x / other.x, this.y / other.y)
        return new Vector(this.x / other, this.y / other)
    }
    /**
     * Get the length of a vector.
     * @returns {number} the lenght of this vector.
     */
    len = () => {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    /**
     * Get the distance between two vectors.
     * @param other {Vector} The vector to add coordinates with.
     * @returns {Number} the resulting vector.
     */
    dist = (other) => {
        return this.sub(other).len()
    }
    /**
     * Get the average from two vectors.
     * @param other {Vector} The vector to get the average with.
     * @returns {Vector} the resulting vector.
     */
    avg = (other) => {
        return this.add(other).div(2)
    }
    /**
     * Rotate a vector.
     * @param rotation {number} Rotation in radians, use 180/pi to transform into degrees and back
     * @returns {Vector} the rotated vector.
     */
    rotate = (rotation) => {
        return new Vector(
            this.x * Math.cos(rotation) - this.y * Math.sin(rotation),
            this.x * Math.sin(rotation) + this.y * Math.cos(rotation)
        )
    }
    /**
     * Create a copy of a vector.
     * @returns {Vector} a clone of this vector.
     */
    clone = () => {
        return new Vector(this.x, this.y)
    }
    /**
     * Round a vector to the nearest decimal.
     * @returns {Vector} the rounded vector.
     */
    round = () => {
        return new Vector(Math.round(this.x), Math.round(this.y))
    }
}

class RayResult {
    /**
     * A result from a rayCast
     * @param length How long the ray had to go
     * @param wasX Did it hit on the x or the y axis
     * @param startPos The ray's starting position
     * @param endPos The ray's hitting position, or null if not hit before length
     * @param hitTile The time the ray hit, or null of not hit before length
     */
    constructor(length, wasX, startPos, endPos, hitTile) {
        this.length = length
        this.wasX = wasX
        this.startPos = startPos
        this.endPos = endPos
        this.hitTile = hitTile
    }
}

/**
 * Utility functions
 */
/**
 * Send a ray and get a result back.
 * @param startVec The ray's starting position.
 * @param dirVec The direction and speed the ray travels with (speed affects performance).
 * @param maxlength The maximum distance a ray will attempt to travel (affects performance).
 * @returns {RayResult} the hit result of the ray being sent.
 */
rayCast = (startVec, dirVec, maxlength) => {
    // Create the marcher
    let moveVec = startVec.clone(),
        posRound, posContent
    while (startVec.dist(moveVec) <= maxlength) {
        // X
        moveVec.x += dirVec.x
        posContent = checkPos(moveVec)
        if (posContent) return new RayResult(startVec.dist(moveVec), true, startVec, moveVec, posContent)

        // Y
        moveVec.y += dirVec.y
        posContent = checkPos(moveVec)
        if (posContent) return new RayResult(startVec.dist(moveVec), false, startVec, moveVec, posContent)
    }
    // Didn't hit before length
    return new RayResult(maxlength, false, startVec, null, null)
}
/**
 * Check a vector's map position.
 * @param pos {Vector} The position to check.
 * @returns {number} the value at the pos or undefined if out of bounds.
 */
checkPos = (pos) => {
    pos = pos.round()
    return map?.[pos.x]?.[pos.y]
}
/**
 * Set the styling data of a single bar which is used to render the world.
 * @param bar {Number} The id of the bar.
 * @param rayResult {RayResult} The rayResult belonging to the bar supplied by bar.
 */
setBar = (bar, rayResult) => {
    const barEl = bars[bar]
    barEl.style.opacity = rayResult.hitTile ? '1' : '0';
    barEl.style.height = `${100/rayResult.length}%`
    barEl.style.background = rayResult.wasX ? "black" : "white";
}
/**
 * Send all rays for rendering
 * @param fov {number} The fov in radians.
 */
sendRays = (fov) => {
    const fovStart = player.angle - fov / 2,
        jump = fov / count
    for (let i = 0; i < count; i++) {
        const part = fovStart + jump * i,
            dir = new Vector(0, 1).div(30).rotate(part)
        let result = rayCast(player.posToVec(), dir, 10)
        setBar(i, result)
    }
}

/**
 * Add functions to player
 */

/**
 * Handle movement inputs for the next tick.
 * @param inputs {Object} The inputs object containing the last user inputs.
 */
player.handleMovement = (inputs) => {
    let vel = new Vector(inputs.horizontal, inputs.vertical).rotate(player.angle)
    player.x += vel.x
    player.y += vel.y
    if (inputs.rotation) {
        player.angle += inputs.rotation
        inputs.rotation = 0
    }
}
/**
 * Get the player's position as a vector.
 * @returns {Vector} the player's position as a vector.
 */
player.posToVec = () => {
    return new Vector(player.x, player.y)
}

/**
 * Element reference
 */

/**
 * The parent of the bar elements.
 * @type {HTMLElement}
 */
const parent = document.getElementById('page')
for (let i = 0; i < count; i++) {
    parent.innerHTML += `<div style="left: ${100/count*i}vw;height: ${100*Math.random()}%;width: calc(${100/count}vw + 1px)" class="slide"></div>`
}

/**
 * The array of bar elements.
 * @type {NodeListOf<Element>}
 */
const bars = parent.querySelectorAll('.slide')

/**
 * Setup
 */
document.body.addEventListener('mousedown', (e) => {
    document.body.requestPointerLock()
})
document.body.addEventListener('pointermove', (e) => {
    if (document.pointerLockElement) inputs.rotation = e.movementX/100
})
document.body.addEventListener('keydown', (e) => {
    inputs.raw[e.key] = true
})
document.body.addEventListener('keyup', (e) => {
    inputs.raw[e.key] = false
})

/**
 * Running
 */
//Movement
setInterval(() => {
    const speed = 0.2
    //Input
    inputs.horizontal = (inputs.raw["a"] ? 1 : 0 + inputs.raw["d"] ? -1 : 0) * speed
    inputs.vertical = (inputs.raw["s"] ? -1 : 0 + inputs.raw["w"] ? 1 : 0) * speed
    //Send input
    player.handleMovement(inputs)
}, 50)

//Rendering
setInterval(() => {
    sendRays(1.5)
}, 1000/60)//attempts 60 fps

/**
 * Update debug info
 */

/**
 * The player x position debug element.
 * @type {HTMLElement}
 */
const plXEl = document.getElementById('playerX'),
    /**
     * The player y position debug element.
     * @type {HTMLElement}
     */
    plYEl = document.getElementById('playerY'),
    /**
     * The player rotation debug element.
     * @type {HTMLElement}
     */
    plRotEl = document.getElementById('playerRot')
setInterval(() => {
    plXEl.innerText = `${Math.round(player.x*100)/100}`
    plYEl.innerText = `${Math.round(player.y*100)/100}`
    plRotEl.innerText = `${Math.round(player.angle*100)/100} Rad`
},50)