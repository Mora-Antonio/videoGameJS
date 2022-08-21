const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;
let mapasOrdenados = maps.map(element => element.split(`\n    `)).map(element => element.map(item => Object.values(item)));

function startGame(){
    game.font = `${elementSize}px Arial`;
    game.textAlign = 'start';
    let mapaActual = mapasOrdenados[2];
    mapaActual.forEach((row, indexRow) => {
        let posicionY = (indexRow + 1)  * elementSize;
        row.forEach((column, indexColumn) =>{
            let posiconX =  indexColumn * elementSize;
            game.fillText(emojis[column], posiconX, posicionY );
        });
    });
}
function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.8 : canvasSize = window.innerHeight * 0.8;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementSize = Math.floor(canvasSize/10);
    startGame();
}