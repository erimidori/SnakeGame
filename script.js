let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
//Definir que a cobrinha apareça no meio da tela
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

//Definir que a comidinha apareça de forma aleatória na tela
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Definir total de frutinha ao final do jogo
var total = 0;

//Função de definir o fundo do jogo
function criarBG() { 
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Função de criar a cobrinha
function criarCobrinha() { 
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Função de criar a comidinha
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Evento keydown é disparado quando uma tecla é pressionada
document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";  
    if(event.keyCode == 38 && direction != "down") direction = "up";     
    if(event.keyCode == 39 && direction != "left") direction = "right";  
    if(event.keyCode == 40 && direction != "up") direction = "down";     
    
}

function iniciarJogo() {
    //Permitir que a cobrinha ultrapasse as paredes
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
     
    //Emitir um alerta quando a cobrinha se chocar com o corpo dela
    for(i=1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :( \n' + 'Total de frutinhas: ' + total);
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //Definir a posição da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Definir as coordenadas da cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;


    //Definir que a comidinha apareça aleatorimente quando a cobrinha come a frutinha e aumenta o tamanho da cobrinha
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {total ++;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
    
    //Definir a cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

//Permitir que possa reiniciar o jogo
document.addEventListener('click', ()=>{
    document.location.reload(true);
    })

//Função de tempo. Está passando um intervaldo de 100ms para a função "iniciarJogo" e a cada 100ms vai ser renovada.
let jogo = setInterval(iniciarJogo, 100); 
