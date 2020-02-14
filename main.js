class Game {
  constructor () {
    const canvas = document.getElementById('canvas')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize))
    this.bodies = this.bodies.concat(enemies(this))

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    const notCollidingWithAnything = (b1) => {
      return this.bodies.filter(function (b2) { return colliding(b1, b2) }).length === 0
    }

    this.bodies = this.bodies.filter(notCollidingWithAnything)

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)

    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  addBody (body) {
    this.bodies.push(body)
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 20, y: 20 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y }
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2
    }
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
    this.moveX = 0
    this.moveY = 0
    this.speedX = 0.2 + Math.random() * 0.5
    this.speedY = 0.2 + Math.random() * 0.5
  }

  update () {
    this.center.x += this.speedX
    this.center.y += this.speedY
    this.speedX = -1
    this.speedX = 0
  }
}
function enemies (game, gameSize) {
  const enemies = []
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * (300 - 15)
    const y = 15 + Math.random() * 30
    enemies.push(new Enemy(game, { x: x, y: y }))
  }
  return enemies
}

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
  screen.fillStyle = 'red'
}
function colliding (b1, b2) {
  return !(
    b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  )
}

function myFunction () {
  new Game()
}
