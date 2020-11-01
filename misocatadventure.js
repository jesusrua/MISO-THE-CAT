//CREACIÓN AREA DE JUEGO

const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 350;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
};

//CREACIÓN COMPONENTE PARA JUGADOR Y OBSTÁCULOS
class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedY = 0;
    }

    update() {
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos() {
        if (this.y < 170) {
            this.speedY = 2;
        }
        this.y += this.speedY;
        if (this.speedY === 2 && this.y === 250) {
            this.speedY = 0;
        }
    }

    jump() {
        this.speedY = -2;
    }

    left () {
        return this.x;
    }

    right() {
        this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }
    //NO FUNCIONA ESTA MIERDA
    /*crashWith(obstacle) {
        return !(this.bottom() >= obstacle.top() && this.right() <= obstacle.left())
    }*/

}

//CREACIÓN DEL JUGADOR
const player = new Component(40, 40, 'red', 230, 250);

//FUNCIÓN BOTÓN SALTO (ESPACIO)

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
        player.jump()
    }
})

//FUNCION CHEQUEAR FINAL DEL JUEGO

function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
        return player.crashWith(obstacle);
    });

    if (crashed) {
        myGameArea.stop()
    }
}

//CREACIÓN DE LA VARIABLE QUE ALMACENARÁ LOS OBSTÁCULOS
const myObstacles = []

//CREACIÓN DE LA FUNCIÓN PARA CREAR LOS OBSTÁCULOS
function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update()
    }

    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
        let x = myGameArea.canvas.width;
        minGap = 100
        maxGap = 300
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        /*myObstacles.push(new Component(width, height, color, x, y))*/
        myObstacles.push(new Component(40, 40, "green", x + gap, 250))
    }
}

//CREACIÓN UPDATE GAMEAREA

function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    checkGameOver();

}

myGameArea.start();