const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
let canvasSize;
let elementSize;

function startGame(){
    game.font = `${elementSize - 10}px Arial`;
    game.textAlign = 'end';
    for(let i = 1; i <=10;i++){
        game.fillText(emojis.X, elementSize,  elementSize * i);
    }
}
function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.8 : canvasSize = window.innerHeight * 0.8;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementSize = Math.floor(canvasSize/10);
    startGame();
}