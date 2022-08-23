const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const playerPostion = {
    x: undefined,
    y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;

let mapasOrdenados = maps.map(element => element.split(`\n    `)).map(element => element.map(item => Object.values(item)));

function startGame(){
    game.font = `${elementSize}px Arial`;
    game.textAlign = 'start';
    let mapaActual = mapasOrdenados[0];
    
    mapaActual.forEach((row, indexRow) => {
        let posicionY = (indexRow + 1)  * elementSize;
        row.forEach((column, indexColumn) =>{
            let posiconX =  indexColumn * elementSize;
            game.fillText(emojis[column], posiconX, posicionY );

            if(playerPostion.x === undefined && column == 'O'){
                playerPostion.x  = posiconX;
                playerPostion.y = posicionY;
            }
        });
    });
    movePlayer();
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPostion.x, playerPostion.y);
}
function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75 : canvasSize = window.innerHeight * 0.75;
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
    if(playerPostion.y == elementSize * 1){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.x += 0;
        playerPostion.y -= elementSize;
    }
    setCanvasSize();
}
function moveDown(){
    if(playerPostion.y == elementSize * 10){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.x += 0;
        playerPostion.y += elementSize;
    }
    setCanvasSize();
}
function moveRight(){
    if(playerPostion.x == elementSize * 9){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x += elementSize;
        playerPostion.y += 0;
    }
    setCanvasSize();
}
function moveLeft(){
    if(playerPostion.x == 0){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x -= elementSize;
        playerPostion.y += 0;
    }
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
