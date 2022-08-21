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
    for(let i = 1; i <= mapaActual.length; i++){
        let posicionY = elementSize * i;
        let lineaMapa = mapaActual[i - 1];
        for(let w = 0; w < lineaMapa.length; w++){
            let posiconX = elementSize * w;
            game.fillText(emojis[lineaMapa[w]], posiconX,  posicionY);
        }
    }
}
function setCanvasSize(){
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.8 : canvasSize = window.innerHeight * 0.8;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementSize = Math.floor(canvasSize/10);
    startGame();
}