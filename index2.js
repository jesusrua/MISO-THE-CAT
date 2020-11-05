window.onload = () => {

    //CREACIÓN DE CANVAS________________________________________________________________________

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    //CLASSES___________________________________________________________________________________

    //COOKIES

    class Obstacle {
        constructor(_x, _y, _width) {
            this.x = _x
            this.y = _y
            this.width = _width
        }
    };

    //Obstáculo malo  

    class Obstacle2 {
        constructor(_x, _y, _width) {
            this.x = _x
            this.y = _y
            this.width = _width
        }
    };

    //VARIABLES_________________________________________________________________________________

    //Música
    let backgroundAudio = new Audio("./sounds/POL-follow-me-short.wav")
    backgroundAudio.loop = true;
    backgroundAudio.volume = .2;




    //Gato
    let lives = 7;
    let lifeUp = false;
    let catVelocityY = 6;
    let catVelocityX = 6;
    let catY = 242;
    let catX = 100;
    let gravity = 0.9;
    let isJumping = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let rightTimer
    let leftTimer

    //Otras
    let endGame = false;
    let victory = false;
    let dateRightNow = Date.now()
    let dateRightNow2 = Date.now()
    const obstacles = []
    const obstacles2 = []
    let clickable = true;

    //Para countDown
    let timeLeft = 60;
    let timeCounter = 1;
    let countDownTime = 1000;

    //DOM MANIPULATION__________________________________________________________________________

    //Botón Start Game
    document.getElementById("start-game").onclick = (event) => {
        if (clickable === true) {
            document.getElementById("start-game").classList.add("disabled")
            clickable = false;
            endGame = false;
            victory = false;
            lives = 7;
            timeLeft = 60;
            timeCounter = 1;
            countDownTime = 1000;
            obstacles.length = 0;
            obstacles2.length = 0;
            catX = 100;
            clearInterval(countDown)
            countDown()
            startGame()
        }
    };

    //Botón Arrow Up, Arrow Right & Arrow Left
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowUp") {
            jump()
        }

        if (event.code === "ArrowRight") {
            if (catX <= 455) {
                slideRight()
            }
        }

        if (event.code === "ArrowLeft") {
            if (catX >= 15) {
                slideLeft()
            }
        }
    });

    //FUNCIONES_________________________________________________________________________________

    //CREAR IMÁGENES
    const renderBackground = () => {
        const background = new Image()
        background.src = "./Images/BACKGROUND/background1.png"
        drawBackground(background)
    }

    const renderCat = () => {
        const cat = new Image()
        cat.src = "./Images/CATS/final-cat.png"
        drawCat(cat)
    }

    //DIBUJAR IMÁGENES

    const drawBackground = (_background) => {
        _background.onload = () => {
            ctx.drawImage(_background, 0, 0, 500, 350)
        }
    }

    const drawCat = (_cat) => {
        _cat.onload = () => {
            ctx.drawImage(_cat, catX, catY, 30, 41)
        }
    }

    //CREAR TEXTO VIDAS

    const renderLives = () => {

        ctx.font = '20px sans-serif'
        ctx.fillStyle = 'white'
        ctx.fillText(`LIVES: ${lives}`, 15, 30)
    }

    //SALTO DEL GATO y FUNCIONES SLIDE IZQUIERDA Y DERECHA

    const jump = () => {
        if (isJumping) return
        let timerUp = setInterval(() => {
            if (catY <= 149) {
                clearInterval(timerUp)
                let timerDown = setInterval(() => {
                    if (catY >= 240) {
                        clearInterval(timerDown)
                        isJumping = false
                    }
                    catY += catVelocityY
                }, 20)
            }
            isJumping = true
            catY -= catVelocityY
            catY = catY * gravity
        }, 20)
    }

    const slideLeft = () => {
        if (isGoingRight || catY >= 240) {
            clearInterval(rightTimer)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimer = setInterval(() => {
            if (catY >= 240 && isGoingLeft) {
                isGoingLeft = false
                clearInterval(leftTimer)
                catX -= 8
            }
            catX -= catVelocityX * gravity
        }, 20)
    }

    const slideRight = () => {
        if (isGoingLeft) {
            clearInterval(leftTimer)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimer = setInterval(() => {
            if (catY >= 240 && isGoingRight) {
                isGoingRight = false
                clearInterval(rightTimer)
                catX += 8
            }
            catX += catVelocityX * gravity
            console.log("going left")
        }, 20)
    }

    const createObstacle = () => {

        if (Date.now() - dateRightNow >= 1000) {
            dateRightNow = Date.now()
            const newObstacle = new Obstacle(500, 124, 40)
            obstacles.push(newObstacle)
        }
    }

    //Dibujar Fish Cookies
    const cookieImage = new Image()
    cookieImage.src = "./Images/FISH-COOKIE/cookieCut.png"

    const drawObstacles = () => {
        obstacles.forEach((obstacle) => {
            ctx.drawImage(cookieImage, obstacle.x, obstacle.y, obstacle.width, 25)
        })
    };

    const updateObstacles = () => {

        obstacles.forEach((obstacle) => {
            obstacle.x -= 4
        })
    };

    //CREACIÓN OBSTÁCULOS MALOS

    const createObstacle2 = () => {
        if (Date.now() - dateRightNow2 >= 2500) {
            dateRightNow2 = Date.now()
            const newObstacle2 = new Obstacle2(500, 255, 35)
            obstacles2.push(newObstacle2)
        }
    }

    const cucumberImage = new Image()
    cucumberImage.src = "./Images/CUCUMBER/pepino-ok.png"

    const waterImage = new Image()
    waterImage.src = "./Images/WATER-DROP/water-splash.png"

    const dogImage = new Image()
    dogImage.src = "./Images/DOGS/final-dog.png"

    const drawObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            ctx.drawImage(waterImage, obstacle.x, obstacle.y, obstacle.width, 35)
        })

    }

    const updateObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            obstacle.x -= 2
        })
    }

    //COMPROBAR COLISIÓN CON COOKIES
    const checkCookieCollision = () => {
        obstacles.forEach((obstacle, index) => {
            if (catX <= obstacle.x + obstacle.width &&
                catX + 30 > obstacle.x &&
                catY <= obstacle.y + 25 &&
                41 + catY >= obstacle.y) {
                lives++
                obstacles.splice(index, 1)
            }
        })
    }

    //COMPROBAR COLISIÓN CON OBSTACLE MALOS


    const checkBadCollision = () => {
        obstacles2.forEach((obstacle, index) => {
            if (catX <= obstacle.x + obstacle.width &&
                catX + 30 > obstacle.x &&
                catY <= obstacle.y + 25 &&
                41 + catY >= obstacle.y) {
                lives--
                obstacles2.splice(index, 1)
            }
        })
    }

    //COMPROBAR Y DIBUJAR FIN DEL JUEGO

    const checkEndGame = () => {
        if (lives <= 0) {
            return endGame = true
        }
    };

    const renderGameOver = () => {
        const gameOver = new Image()
        gameOver.src = "./Images/GAME-OVER/gameOverOk.png"
        drawGameOver(gameOver)
    };

    const drawGameOver = (_gameOver) => {
        _gameOver.onload = () => {
            ctx.drawImage(_gameOver, 100, 100, 300, 150)
        }
    }

    //COMPROBAR Y DIBUJAR VICTORIA

    const checkVictory = () => {
        if (lives >= 50) {
            return victory = true;
        }
    };

    const renderVictory = () => {
        const victory = new Image()
        victory.src = "./Images/VICTORY/youwinok.png"
        drawVictory(victory)
    };

    const drawVictory = (_victory) => {
        _victory.onload = () => {
            ctx.drawImage(_victory, 100, 100, 300, 150)
        }
    }

    //FUNCIÓN CUENTA ATRAS DEL JUEGO

    const countDown = () => {
        setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
                endGame = true;
            }
            timeLeft = timeLeft - timeCounter

        }, countDownTime)
    }

    const renderCountDown = () => {
        ctx.font = "20px sans-serif"
        ctx.fillStyle = "white"
        ctx.fillText(`TIME LEFT: ${timeLeft}`, 350, 30)
    }

    //START GAME FUNCIÓN

    startGame = () => {
        if (!endGame && !victory) {
            renderBackground()
            renderCat()
            renderLives()
            renderCountDown()
            backgroundAudio.play()
            createObstacle()
            drawObstacles()
            updateObstacles()
            createObstacle2()
            drawObstacles2()
            updateObstacles2()
            checkCookieCollision()
            checkBadCollision()
            checkEndGame()
            checkVictory()
            requestAnimationFrame(startGame)
        } else if (victory) {
            renderVictory()
            renderLives()
            backgroundAudio.pause()
            clickable = true;
            document.getElementById("start-game").classList.remove("disabled")
        } else if (endGame) {
            renderGameOver()
            renderLives()
            backgroundAudio.pause()
            clickable = true;
            document.getElementById("start-game").classList.remove("disabled")
        }
    }
};