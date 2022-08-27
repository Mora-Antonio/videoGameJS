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
const collisionPosition= {
    x: undefined,
    y : undefined,
}
let enemyPositions = [];
let nivel = 0;
let lives = 5;
let valor;
const vidas = document.querySelector('#lives');
const timeGame = document.querySelector('#time');
const spanTimeRecord = document.querySelector('#timeRecord');
let timeStart;
let timeInterval;
let timePlayer;
const gameOver = document.querySelector('.gameOver');
let posicionCanvas;


spanTimeRecord.innerHTML = localStorage.getItem('timeRecord');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75 : canvasSize = window.innerHeight * 0.75;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    valor = mapasOrdenados[nivel][0].length;
    elementSize = Math.floor(canvasSize/valor);
    posicionCanvas = canvas.getBoundingClientRect().top;
    startGame();
}

function startGame(){
    if(localStorage.getItem('timeRecord',timePlayer)){
        spanTimeRecord.classList.add('timeRecord');
    }
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
                if(collisionPosition.x){
                    game.fillText(emojis['COLLISION'], collisionPosition.x * elementSize, collisionPosition.y * elementSize );
                }
            }
            game.fillText(emojis[column], posiconX, posicionY );
        });
    });
    showLives();
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
        collisionPosition.x = undefined;
        if(!mapasOrdenados[nivel]){
            winGame();
            return
        }
        else{
            playerPostion.x  = undefined;
            setCanvasSize();
        }
    }
}
function defeat(){
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy['x'] == playerPositionFinish.x;
        const enemyCollisionY = enemy['y'] == playerPositionFinish.y;
        return enemyCollisionX && enemyCollisionY;
    }
    );
    if(enemyCollision){
        lives = lives -1;
        collisionPosition.x = playerPostion.x;
        collisionPosition.y = playerPostion.y;
        playerPostion.x = undefined;
        playerPostion.y = undefined;
        if(lives <= 0){
            nivel = 0;
            lives = 5;
            clearInterval(timeInterval);
            timeGame.innerHTML = '0.00';
            timeStart = undefined;
            collisionPosition.x = undefined;
        }
        startGame();
      }
}

function winGame(){
    clearInterval(timeInterval);
    let recordGlobal = localStorage.getItem('timeRecord');
    if(recordGlobal){
        if(parseFloat(localStorage.getItem('timeRecord')) >= timePlayer){
            localStorage.setItem('timeRecord',timePlayer);
        }
    }else{
        localStorage.setItem('timeRecord',timePlayer);
    }
    spanTimeRecord.innerHTML = localStorage.getItem('timeRecord');
}
function defeatWame(){
    
}

function getStartTime(){
    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTimeGame, 100);
    }else{
        timeStart = timeStart;
    }
}

function showLives(){
    vidas.innerHTML = '';
    const heartsArray = Array(lives).fill(emojis['HEART']);
    heartsArray.forEach(item =>  {
        vidas.innerHTML += `${item} `;
    });
}

function showTimeGame(){
    timePlayer = Math.round(((Date.now() - timeStart) / 1000)*100)/ 100;
    timeGame.innerHTML = timePlayer;
}

window.addEventListener('keyup', mostrarTecla);

function mostrarTecla(event){
    switch (event.code){
        case 'ArrowUp':
            moveUp();
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
    getStartTime();
    startGame();
}
function moveDown(){
    if(playerPositionFinish.y == elementSize * valor){
        playerPostion.y = playerPostion.y;
    }else{
        playerPostion.y += 1;
        playerPositionFinish.y = playerPostion.y * elementSize;
    }
    getStartTime();
    startGame();
}
function moveRight(){
    if(playerPositionFinish.x == elementSize * (valor - 1)){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x += 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    getStartTime();
    startGame();
}
function moveLeft(){
    if(playerPositionFinish.x == 0){
        playerPostion.x = playerPostion.x;
    }else{
        playerPostion.x -= 1;
        playerPositionFinish.x = playerPostion.x * elementSize;
    }
    getStartTime();
    startGame();
}
