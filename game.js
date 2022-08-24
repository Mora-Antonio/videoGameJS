const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const mapasOrdenados = maps.map(element => element.split(`\n    `)).map(element => element.map(item => Object.values(item)));

let canvasSize;
let elementSize;
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
let enemyPositions = [];
let nivel = 0;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75 : canvasSize = window.innerHeight * 0.75;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementSize = Math.floor(canvasSize/10);
    startGame();
}

function startGame(){

    game.font = `${elementSize}px Arial`;
    game.textAlign = 'start';

    let mapaActual = mapasOrdenados[nivel];

    if(!mapaActual){
        winGame();
        return;
    }
    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);
    mapaActual.forEach((row, indexRow) => {
        let posicionY = (indexRow + 1)  * elementSize;
        row.forEach((column, indexColumn) =>{
            let posiconX =  indexColumn * elementSize;

            if(playerPostion.x === undefined && column == 'O'){
                playerPostion.x  = indexColumn;
                playerPostion.y = indexRow + 1;
                
            }else if(column == 'I'){
                trophyPostion.x  = posiconX;
                trophyPostion.y = posicionY;
            }else if(column == 'X'){
                enemyPositions.push({
                    x: posiconX,
                    y: posicionY,
                })
            }

            game.fillText(emojis[column], posiconX, posicionY );
        });
    });
    movePlayer();
}

function movePlayer(){
    playerPositionFinish.x = playerPostion.x * elementSize;
    playerPositionFinish.y = playerPostion.y * elementSize;
    victory();
    defeat();
    game.fillText(emojis['PLAYER'], playerPositionFinish.x, playerPositionFinish.y);
}

function victory(){
    if(playerPositionFinish.x ===  trophyPostion.x && playerPositionFinish.y ===  trophyPostion.y){
        nivel += 1;
        startGame();
    }
}
function defeat(){
    for(bom of enemyPositions){
        if(playerPositionFinish.x == bom['x'] && playerPositionFinish.y == bom['y']){
            playerPostion.x = undefined;
            playerPostion.y = undefined;
            startGame();
        }
    }
}

function winGame(){
    console.log('Ganaste el juego')
}

window.addEventListener('keyup', mostrarTecla);

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
    setCanvasSize();
}
function moveDown(){
    if(playerPositionFinish.y == elementSize * 10){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.y += 1;
        playerPositionFinish.y = playerPostion.y * elementSize;
    }
    setCanvasSize();
}
function moveRight(){
    if(playerPositionFinish.x == elementSize * 9){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x += 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    setCanvasSize();
}
function moveLeft(){
    if(playerPositionFinish.x == 0){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x -= 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    setCanvasSize();
}
