//CREACIÓN DE CANVAS
const canvas = document.getElementById('miso-cat-board');
const ctx = canvas.getContext('2d');
//let spacePressed = false;

//LIMPIAR CANVAS

const clearCanvas = () => {
    ctx.clearRect(0, 0, 500, 350);
}

//IMAGEN FONDO 
const createBackground = () => {
    const background = new Image()
    background.src = "/Images/BACKGROUND/background1.png"
    background.onload = () => {
        ctx.drawImage(background, 0, 0, 500, 350)
    }
}

//IMAGEN GATO 1
const createCat1 = () => {
    const cat = new Image()
    cat.src = "/Images/CATS/tile007.png"
    cat.onload = () => {
        ctx.drawImage(cat, 230, 250, 40, 40)
    }
}

//IMAGEN GATO 2
const createCat2 = () => {
    const cat = new Image()
    cat.src = "/Images/CATS/tile009.png"
    cat.onload = () => {
        ctx.drawImage(cat, 230, 250, 40, 40)
    }
}

//ANIMACIÓN GATO CAMINANDO
const updateCat = () => {
    //updateContent(direction); De momento no la uso.
    //Cuando cree la función de saltar, entiendo que irá aquí(?)
    //clearCanvas();
    createBackground();
    createCat1();
    //clearCanvas();
    //createBackground();
    //createCat2();
    requestAnimationFrame(updateCat);
}

//const updateContent = ()=>{}

//const updateCanvas = ()=>{}

//createBackground()
//createCat1()

updateCat();



/*window.addEventListener("keydown", (event)=> {
    if(event.key === "Space") {

    }
})*/

/*window.onload = () => {

    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');

    const createBackground = ()=>{
        const background = new Image ():
        background.src = "/Images/BACKGROUND/background1.png"
        background.onload = ()=>{
          ctx.drawImage(background, 0, 0, 500, 350)
        }
    }
createBackground()*/

function control(event) {
    if (event.keyCode === 32) {
        console.log("JUMP")
    }
}

document.addEventListener("keydown", control)