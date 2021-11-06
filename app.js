
document.addEventListener('DOMContentLoaded',()=>{
    let score = document.querySelector('.score');
    let startB = document.querySelector('#startGame')
    let tiles = Array.from(document.querySelectorAll('.grid div'));
    let upArrow = document.querySelector('.up');
    let leftArrow = document.querySelector('.left');
    let downArrow = document.querySelector('.down');
    let rightArrow = document.querySelector('.right');
    let gameoverText = document.querySelector('.gameover')

    let snakeBody = [2,1,0];
    let appleBody = Math.floor(Math.random() * tiles.length-1);
    let moveTiles = 1
    let gameOver = false;
    let gameInterval;
    function eat(){
        snakeBody.push(snakeBody[snakeBody.length - 1])
        appleBody = Math.floor(Math.random() * tiles.length-1);
    }
    function drawSnake(){
        tiles.map(tile=>{
            tile.style.background = 'black';
            tiles[appleBody].style.background = 'red';
        })
        snakeBody.map(s=>{
            tiles[s].style.background = 'rgb(57, 255, 20)';
        })  
    }
    function upDateSnake(newHeadPos){
        for(let i = snakeBody.length; i > 0; i--){
            snakeBody[i] = snakeBody[i - 1]
        }
        snakeBody[0] =  snakeBody[0] + newHeadPos
        snakeBody.pop()


        if(snakeBody[0]<0){  // crash inn top
            snakeBody[0] = tiles.length - ( 10 - snakeBody[0]) + 10;
        }
        if(snakeBody[0] > tiles.length - 1){  // crash inn bottom
            snakeBody[0] = 10 - (tiles.length - snakeBody[0]) - 10
        }
        for(let j = 10; j <= 90; j+=10){
            if(snakeBody[0] == j && moveTiles == 1  && snakeBody[1] != 99 ){ // right wall
                snakeBody[0] = snakeBody[0] - 10;
            }
            else if(snakeBody[1] == 99 && moveTiles == 1){//lower right wall
                snakeBody[0] = 90;
            }
            if( snakeBody[0] + 1 == j  && moveTiles == -1 ){ // left wall
                snakeBody[0] = snakeBody[1] + 9
            }
            else if(snakeBody[1] == 0 && moveTiles == -1){ // left wall top
                snakeBody[0] = 10 - 1
            }
        }
        if(snakeBody[0] == appleBody){
            eat();
        }
    }

    function arrowControl(){
        upArrow.addEventListener('click',()=>{
            if(moveTiles != 10){//UP
                moveTiles = -10;
            }
        })
        leftArrow.addEventListener('click',()=>{
            if(moveTiles != 1){//left
                moveTiles = -1;
            }
        })
        downArrow.addEventListener('click',()=>{
            if(moveTiles != -10){//DOWN
                moveTiles = 10;
            }
        })
        rightArrow.addEventListener('click',()=>{
            if(moveTiles != -1){//RIGHT
                moveTiles = 1;
            }
        })
    }
    function controlSnake(){
        window.addEventListener('keydown',(e)=>{
            if(e.keyCode == 37 && moveTiles != 1){//left
                moveTiles = -1;
            }
            if(e.keyCode == 38 && moveTiles != 10){//UP
                moveTiles = -10;
            }
            if(e.keyCode == 39 && moveTiles != -1){//RIGHT
                moveTiles = 1;
            }
            if(e.keyCode == 40 && moveTiles != -10){//DOWN
                moveTiles = 10;
            }
            
        })
        arrowControl()
    }
    function gameover(){
        for(let i = 1; i < snakeBody.length - 1; i++){
            if(snakeBody[0] == snakeBody[i]){
                console.log("gameOver")
                gameOver=true;
                clearInterval(gameInterval);
                gameInterval=null;
                gameoverText.style.visibility = "visible"
            }
        }
        
    }
    
    function main(){
        score.innerHTML = `score:${snakeBody.length - 3}`
        console.log(snakeBody)
        gameover()
        drawSnake()
        controlSnake()
        upDateSnake(moveTiles)
    }
    function game(){
        if(!gameOver && !gameInterval){
        gameInterval = setInterval(main,500)
        }
    }
    
    startB.addEventListener('click',()=>{
        moveTiles = 1
        gameOver = false;
        snakeBody = [2,1,0];
        game()
        gameoverText.style.visibility = "hidden"
    })


})


