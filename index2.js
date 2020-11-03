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
    }

    //class fishCookies {
    //     constructor() {
    //     }
    //}


    /*class fishCookies {
        constructor(_x, _y, _height, _width, _color) {
            this.x = _x
            this.y = _y
            this.height = _height
            this.width = _width
            this.color = _color
        }
        
        addLife() {
            life += 1
        }
    }*/


    //Obstáculo malo



    //VARIABLES_________________________________________________________________________________

    //Gato
    let life = 7;
    let catVelocityY = 5;
    //let catGravityY = 0;
    let catY = 240;
    let catX = 220;
    ctx.fillStyle = "green"

    //Cookies
    //let cookieX = 400;

    //Otras
    let endGame = false;
    let dateRightNow = Date.now()
    const obstacles = []

    //Para "colisiones"
    const catPosition = [catX, catY]


    //DOM MANIPULATION__________________________________________________________________________

    //Botón Start Game
    document.getElementById("start-game").onclick = (event) => {
        startGame()
    }

    //Botón espacio
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
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

    //SALTO DEL GATO

    const jump = () => {
        let timerUp = setInterval(() => {
            if (catY < 149) {
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


    const getRandomTimeforCookies = () => {
        return Math.floor(Math.random() * 5000) + 2000
    }


    const createObstacle = () => {

        if (Date.now() - dateRightNow >= 1000) {
            dateRightNow = Date.now()
            const newObstacle = new Obstacle(500, 150, 25)
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

    //COMPROBAR COLISIÓN
    /*const checkForCollision = ()=>{
        obstacles.forEach((obstacle)=>{
    
          if(obstacle.y === 579){
    
            if(_carX >= obstacle.x && _carX <= (obstacle.x + obstacle.width)){
              endGame = true
            } else if((_carX + 50) >= obstacle.x && (_carX + 50) <= (obstacle.x + obstacle.width)){
              endGame = true
            } else {
              score++
            }
    
          }
    
        })
      }*/


    //POR QUÉ ESTA NO FUNCIONA??
    //POR QUÉ ESTA NO FUNCIONA??
    const checkCollision = ()=> {
         obstacles.forEach((obstacle)=>{
            if (catX < obstacle.x + obstacle.width &&
                catX + 50 > obstacle.x &&
                catY < obstacle.y + obstacle.height &&
                50 + catY > obstacle.y) {
                console.log("COLISION")
             }
         })
     }

    /*const checkCollision = () => {
        obstacles.forEach((obstacle) => {
            if (obstacle.y  === catY ) {
                return console.log("COLISION")
            }
        })
    }*/

    //ESTA FUNCIONA CON CONSOLELOG PERO NO SUMANDO VIDAS
   /* const checkCollision = ()=>{
        obstacles.forEach((obstacle)=>{
            if(obstacle.y && obstacle.x === catY && catX) {
                //return life ++
                console.log("LIFE UP!")
                
            }
        })
    }*/

    //START GAME FUNCIÓN
    startGame = () => {
        renderBackground()
        renderCat()

        createObstacle()         
        drawObstacles()
        updateObstacles()

        //checkCollision()
        requestAnimationFrame(startGame)
    }

};