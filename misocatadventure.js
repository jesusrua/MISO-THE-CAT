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

    //Gato
    let lifes = 7;
    let lifeUp = false;
    let catVelocityY = 5;
    //let catGravityY = 0;
    let catY = 240;
    let catX = 220;

    //Otras
    let endGame = false;
    let victory = false;
    let dateRightNow = Date.now()
    let dateRightNow2 = Date.now()
    const obstacles = []
    const obstacles2 = []
    let clickable = true;

    //Para countDown
    let timeLeft = 20;

    //DOM MANIPULATION__________________________________________________________________________

    //Botón Start Game
    document.getElementById("start-game").onclick = (event) => {
        if (clickable === true) {
            document.getElementById("start-game").classList.add("disabled")
            clickable = false;
            endGame = false;
            victory = false;
            lifes = 7;
            //timeLeft = 20;
            obstacles.length = 0;
            obstacles2.length = 0;
            startGame()
        }
    }

    //Botón Arrow Up
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowUp") {
            jump()
        }
    })

    //FUNCIONES_________________________________________________________________________________

    //CREAR IMÁGENES
    const renderBackground = () => {
        const background = new Image()
        background.src = "./Images/BACKGROUND/background1.png"
        drawBackground(background)
    }

    const renderCat = () => {
        const cat = new Image()
        cat.src = "./Images/CATS/tile009.png"
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
            ctx.drawImage(_cat, catX, catY, 50, 50)
        }
    }

    //CREAR TEXTO VIDAS

    //Para DOM. Deja de funcionar el juego si lo pongo dentro de la funcion START GAME.
    //Probando de meterlo en la funcion de start boton tampoco funciona.
    /*const lifeCounter = document.getElementById("lifes")
    const lifePrint = () => {
        lifeCounter.textContent = `LIFES: ${life}`
    }*/


    const renderLifes = () => {

        ctx.font = '20px sans-serif'
        ctx.fillStyle = 'white'
        ctx.fillText(`LIFE: ${lifes}`, 15, 30)
    }

    //SALTO DEL GATO

    const jump = () => {
        let timerUp = setInterval(() => {
            if (catY <= 149) {
                clearInterval(timerUp)
                let timerDown = setInterval(() => {
                    if (catY >= 240) {
                        clearInterval(timerDown)
                    }
                    catY += catVelocityY
                }, 20)
            }
            catY -= catVelocityY
        }, 20)
    }

    //CREACIÓN DE FISH COOKIES

    //¿Usar esto para que salgan a distinta distancia?
    /*const getRandomTimeforCookies = () => {
        return Math.floor(Math.random() * 5000) + 2000
    }*/

    const createObstacle = () => {

        if (Date.now() - dateRightNow >= 1000) {
            dateRightNow = Date.now()
            const newObstacle = new Obstacle(500, 124, 50)
            obstacles.push(newObstacle)
        }
    }

    //Dibujar Fish Cookies
    const cookieImage = new Image()
    cookieImage.src = "./Images/FISH COOKIE/cookie.png"

    const drawObstacles = () => {
        obstacles.forEach((obstacle) => {
            ctx.drawImage(cookieImage, obstacle.x, obstacle.y, obstacle.width, 50)
        })

    }

    const updateObstacles = () => {

        obstacles.forEach((obstacle) => {
            obstacle.x -= 4
        })
    }

    //CREACIÓN OBSTÁCULOS MALOS

    const createObstacle2 = () => {
        if (Date.now() - dateRightNow2 >= 1300) {
            dateRightNow2 = Date.now()
            const newObstacle2 = new Obstacle2(500, 255, 35)
            obstacles2.push(newObstacle2)
        }
    }

    const cucumberImage = new Image()
    cucumberImage.src = "./Images/CUCUMBER/pepino ok.png"

    const waterImage = new Image()
    waterImage.src = "./Images/WATER DROP/water-splash.png"

    const dogImage = new Image()
    dogImage.src = "./Images/DOGS/DOG OK.png"

    const drawObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            ctx.drawImage(waterImage, obstacle.x, obstacle.y, obstacle.width, 35)
        })

    }

    const badObstaclesImages = [cucumberImage, waterImage, dogImage]


    /*const drawObstacles2 = () => {
        obstacles2.forEach((obstacle) => {

            const cucumberImage = new Image()
            cucumberImage.src = "/Images/CUCUMBER/pepino ok.png"

            const waterImage = new Image()
            waterImage.src = "/Images/WATER DROP/water-splash.png"

            const dogImage = new Image()
            dogImage.src = "/Images/DOGS/DOG OK.png"

            const badObstaclesImages = [cucumberImage, waterImage, dogImage]

            const randomImages = (min, max) => {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            
            ctx.drawImage(badObstaclesImages[randomImages(0, 3)], obstacle.x, obstacle.y, obstacle.width, 25)
        })
    }*/

    const updateObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            obstacle.x -= 4
        })
    }

    //COMPROBAR COLISIÓN CON COOKIES
    const checkCookieCollision = () => {
        obstacles.forEach((obstacle, index) => {
            if (catX <= obstacle.x + obstacle.width &&
                catX + 50 > obstacle.x &&
                catY <= obstacle.y + 25 &&
                50 + catY >= obstacle.y) {
                lifes++
                obstacles.splice(index, 1)
            }
        })
    }

    //COMPROBAR COLISIÓN CON OBSTACLE MALOS

    const checkBadCollision = () => {
        obstacles2.forEach((obstacle, index) => {
            if (catX <= obstacle.x + obstacle.width &&
                catX + 50 > obstacle.x &&
                catY <= obstacle.y + 25 &&
                50 + catY >= obstacle.y) {
                lifes--
                obstacles2.splice(index, 1)
            }
        })
    }

    //COMPROBAR Y DIBUJAR FIN DEL JUEGO

    const checkEndGame = () => {
        if (lifes <= 0) {
            return endGame = true
        }
    };

    const renderGameOver = () => {
        const gameOver = new Image()
        gameOver.src = "./Images/GAMER OVER/GAME OVER 1.png"
        drawGameOver(gameOver)
    };

    const drawGameOver = (_gameOver) => {
        _gameOver.onload = () => {
            ctx.drawImage(_gameOver, 100, 100, 300, 150)
        }
    }

    //COMPROBAR Y DIBUJAR VICTORIA

    const checkVictory = () => {
        if (lifes >= 10) {
            return victory = true;
        }
    };

    const renderVictory = () => {
        const victory = new Image()
        victory.src = "./Images/VICTORY/YOU WIN.png"
        drawVictory(victory)
    };

    const drawVictory = (_victory) => {
        _victory.onload = () => {
            ctx.drawImage(_victory, 50, 100, 400, 150)
        }
    }

    //FUNCIÓN CUENTA ATRAS DEL JUEGO


    const countDown = () => {
        setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
            }
            timeLeft -= 1

        }, 1000)
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
            renderLifes()
            //lifePrint()

            countDown()
            renderCountDown()

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
            renderLifes()
            clickable = true;
            document.getElementById("start-game").classList.remove("disabled")
        } else if (endGame) {
            renderGameOver()
            clickable = true;
            document.getElementById("start-game").classList.remove("disabled")
        }


    }

};