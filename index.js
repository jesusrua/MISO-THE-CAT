window.onload = () => {

    //CREACIÓN DE CANVAS________________________________________________________________________

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    //CLASSES___________________________________________________________________________________

    //COOKIES

    //class fishCookies {
   //     constructor() {
   //     }
    //}

    class fishCookies {
        constructor(_x, _y, _width){
          this.x = _x
          this.y = _y
          this.width = _width
        }
      }

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

    /*class notEat {
        constructor(_x, _y) {
            this.x = _x
            this.y = _y
            const img = new Image()
            img.addEventListener("load", () => {
                this.img;
                this.draw()
            })
        }

        draw() {
            ctx.drawImage(this.img, this.x, this.y, 40, 40)
        }

        addLife() {
            life += 1
        }

    }*/



    //VARIABLES_________________________________________________________________________________

    //Gato
    let life = 7;
    let catVelocityY = 3;
    let catGravityY = 0;
    let catY = 240;

    //Otras
    let endGame = false;
    let dateRightNow = Date.now()
    const cookies = []


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
            ctx.drawImage(_cat, 220, catY, 50, 50)
        }
    }

    //SALTO DEL GATO

    const jump = () => {
        let timerUp = setInterval(() => {
            if (catY < 150) {
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

    const getRandomTimeforCookies = ()=>{
        return Math.floor(Math.random() * 5000) + 2000
    }

    const createCookies = ()=> {
        if (Date.now() - dateRightNow >= 1000 ){
            dateRightNow = Date.now()
            const newCookie = new fishCookies(500, 150, 50)
            cookies.push(newCookie)
        }
    }

    const drawCookies = ()=>{
        cookies.forEach((cookie)=> {
            ctx.fillRect(cookie.x, cookie.y, "green", cookie.width, 50)
        })
    }

   const updateCookies = ()=> {
        cookies.forEach((cookie)=>{
            cookie.x += -3
        })
    }
    
  

    //START GAME FUNCIÓN
    startGame = () => {
        renderBackground()
        renderCat()

        createCookies()
        drawCookies()
        updateCookies()
        console.log(cookies)

        requestAnimationFrame(startGame)
    }

};