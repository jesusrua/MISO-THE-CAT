window.onload = () => {

    //CREACIÓN DE CANVAS________________________________________________________________________

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    //CLASSES___________________________________________________________________________________

    //COOKIES

    //IMAGEN COOKIES

    const cookiesImg = new Image()
    cookiesImg.src = "/Images/FISH COOKIE/cookie.png"

    const drawCookie = ()=>{
        ctx.drawImage(cookiesImg, 0, 0, 25, 25)
    }

    class Obstacle {
        constructor(_x, _y, _width, _image) {
            this.x = _x
            this.y = _y
            this.width = _width
            this.image = _image
        }
    }

    //Obstáculo malo  

    class Obstacle2 {
        constructor(_x, _y, _width) {
            this.x = _x
            this.y = _y
            this.width = _width
        }
    }

    //Obstáculo malo 2

    


    //VARIABLES_________________________________________________________________________________

    //Gato
    let lifes = 7;
    let lifeUp = false;
    let catVelocityY = 5;
    //let catGravityY = 0;
    let catY = 240;
    let catX = 220;
    //ctx.fillStyle = "green"

    //Cookies

    //Otras
    let endGame = false;
    let victory = false;
    let dateRightNow = Date.now()
    const obstacles = []
    const obstacles2 = []

    //Para "colisiones"
    const catPosition = [catX, catY]


    //DOM MANIPULATION__________________________________________________________________________

    //Botón Start Game
    document.getElementById("start-game").onclick = (event) => {
        startGame()
    }

    //Botón espacio
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowUp") {
            jump()
        }
    })


    //FUNCIONES_________________________________________________________________________________

    //CREAR IMÁGENES
    const renderBackground = () => {
        const background = new Image()
        background.src = "/Images/BACKGROUND/background1.png"
        drawBackground(background)
    }

    const renderCat = () => {
        const cat = new Image()
        cat.src = "/Images/CATS/tile009.png"
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

    const renderLifes = () => {
        ctx.font = '20px sans-serif'
        ctx.fillStyle = 'white'
        ctx.fillText(`LIFES: ${lifes}`, 10, 30)
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

    //CREACIÓN DE COOKIES

    //¿Usar esto para que salgan a distinta distancia?
    const getRandomTimeforCookies = () => {
        return Math.floor(Math.random() * 5000) + 2000
    }

    const createObstacle = () => {

        if (Date.now() - dateRightNow >= 1000) {
            dateRightNow = Date.now()
            const newObstacle = new Obstacle(500, 124, 25, drawCookie())
            obstacles.push(newObstacle)
        }
    }

    const drawObstacles = () => {
        obstacles.forEach((obstacle) => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 25)
        })

    }

    const updateObstacles = () => {

        obstacles.forEach((obstacle) => {
            obstacle.x -= 4
        })
    }

    //CREACIÓN OBSTÁCULOS MALOS

    const createObstacle2 = () => {
        if (Date.now() - dateRightNow >= 1300) {
            dateRightNow = Date.now()
            const newObstacle2 = new Obstacle2(500, 255, 25)
            obstacles2.push(newObstacle2)
        }
    }

    const drawObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 25)
        })

    }

    const updateObstacles2 = () => {
        obstacles2.forEach((obstacle) => {
            obstacle.x -= 4
        })
    }


    //COMPROBAR COLISIÓN CON COOKIES
    //FUNCIONA PERO DETECTA DEMASIADAS COLISIONES POR IMPACTO
    const checkCollision = () => {
        obstacles.forEach((obstacle) => {
            if (catX <= obstacle.x + obstacle.width &&
                catX + 50 > obstacle.x &&
                catY <= obstacle.y + 25 &&
                50 + catY >= obstacle.y) {
                return lifes++
            }
        })
    }

    //TAMBIEN FUNCIONA PERO DETECTA DEMASIADAS COLISIONES POR IMPACTO
    /*const checkCollision = ()=>{
         obstacles.forEach((obstacle)=>{
             if (catY <= 149) {
             if(catX >= obstacle.x && catX <= (obstacle.x + obstacle.width)){
               console.log("COLISION")
             } else if((catX + 50) >= obstacle.x && (catX+ 50) <= (obstacle.x + obstacle.width)){
                 console.log("COLISION")
             } else {
               //score++
             }
         }})
       }*/

    //COMPROBAR Y DIBUJAR FIN DEL JUEGO

    /*const checkEndGame = () => {
        if (lifes <= 0 || "timer is over") {
            return endGame = true
        }
    };*/

    const renderGameOverText = () => {
        ctx.font = '50px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', 250, 175)
    };

    //COMPROBAR Y DIBUJAR VICTORIA

    const checkVictory = () => {
        if (lifes >= 20) {
            return victory = true;
        }
    };

    const renderVictoryText = () => {
        ctx.font = "50px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("YOU WIN!", 250, 175)
    };




    //START GAME FUNCIÓN
    startGame = () => {
        if (!endGame && !victory) {
            renderBackground()
            renderCat()
            renderLifes()

            createObstacle()
            drawObstacles()
            updateObstacles()

            createObstacle2()
            drawObstacles2()
            updateObstacles2()

            checkCollision()
            //checkEndGame()
            checkVictory()

            requestAnimationFrame(startGame)

        } else if (victory) {
            renderVictoryText()
            renderLifes()
        }


    }

};