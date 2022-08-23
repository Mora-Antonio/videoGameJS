const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const playerPostion = {
    x: undefined,
    y: undefined,
}
const playerPositionFinish = {
    x: undefined,
    y: undefined,
}

const trophyPostion = {
    x: undefined,
    y: undefined,
}

let bombs = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;
let nivel = 0;

let mapasOrdenados = maps.map(element => element.split(`\n    `)).map(element => element.map(item => Object.values(item)));

function startGame(){
    game.font = `${elementSize}px Arial`;
    game.textAlign = 'start';
    let mapaActual = mapasOrdenados[nivel];
    
    mapaActual.forEach((row, indexRow) => {
        let posicionY = (indexRow + 1)  * elementSize;
        row.forEach((column, indexColumn) =>{
            let posiconX =  indexColumn * elementSize;
            game.fillText(emojis[column], posiconX, posicionY );

            if(playerPostion.x === undefined && column == 'O'){
                playerPostion.x  = indexColumn;
                playerPostion.y = indexRow + 1;
                
            }
            if(column == 'I'){
                trophyPostion.x  = posiconX;
                trophyPostion.y = posicionY;
            }
            if(column == 'X'){
                bombs.push({
                    x: posiconX,
                    y: posicionY,
                })
            }
        });
    });
    movePlayer();
}

function victory(){
    if(playerPositionFinish.x ===  trophyPostion.x && playerPositionFinish.y ===  trophyPostion.y){
        console.log('Ganaste');
        if(nivel == 2){
            nivel = 0;
        }else{
            nivel += 1;
        }
        console.log(nivel)
        setCanvasSize();
    }
}
function defeat(){
    for(bom of bombs){
        if(playerPositionFinish.x == bom['x'] && playerPositionFinish.y == bom['y']){
            console.log('Perdiste');
            playerPostion.x = undefined;
        }
    }
}

function movePlayer(){
    victory();
    playerPositionFinish.x = playerPostion.x * elementSize;
    playerPositionFinish.y = playerPostion.y * elementSize;
    console.log(`x: ${playerPositionFinish.x} y: ${playerPositionFinish.y}`)
    game.fillText(emojis['PLAYER'], playerPositionFinish.x, playerPositionFinish.y);
}
function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75 : canvasSize = window.innerHeight * 0.75;
    bombs = [];
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementSize = Math.floor(canvasSize/10);
    startGame();
}

window.addEventListener('keyup', mostrarTecla);

const buttonUp = document.querySelector('#up');
const buttonDown = document.querySelector('#down');
const buttonRight = document.querySelector('#right');
const buttonLeft = document.querySelector('#left');

buttonUp.addEventListener('click', moveUp);
buttonDown.addEventListener('click', moveDown);
buttonRight.addEventListener('click', moveRight);
buttonLeft.addEventListener('click', moveLeft);

function moveUp(){
    if(playerPositionFinish.y == elementSize * 1){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.y -= 1;
        playerPositionFinish.y = playerPostion.y * elementSize;
    }
    defeat();
    setCanvasSize();
}
function moveDown(){
    if(playerPositionFinish.y == elementSize * 10){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.y += 1;
        playerPositionFinish.y = playerPostion.y * elementSize;
    }
    defeat();
    setCanvasSize();
}
function moveRight(){
    if(playerPositionFinish.x == elementSize * 9){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x += 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    defeat();
    setCanvasSize();
}
function moveLeft(){
    if(playerPositionFinish.x == 0){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x -= 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    defeat();
    setCanvasSize();
}
function mostrarTecla(event){
    switch (event.code){
        case 'ArrowUp':
            moveUp()
        break;
        case 'ArrowDown':
            moveDown()
        break;
        case 'ArrowLeft':
            moveLeft()
        break;
        case 'ArrowRight':
            moveRight()
        break;
    }
    
}
