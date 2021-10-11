const cell = Array.from(document.querySelectorAll('.cell'));
const enemyCell = cell.slice(0,30);
const playerCell = cell.slice(30);
const scores = document.querySelector('.scores');
let dropCount;
let speed;
let score;
document.addEventListener('keydown',event => {
     if(!dropCount) startGame();
     const player = document.querySelector('.player');
     if(event.key === "ArrowRight" && playerCell.includes(player.parentElement.nextElementSibling)){
          player.parentElement.nextElementSibling.appendChild(player);
     }
     if(event.key === "ArrowLeft" && playerCell.includes(player.parentElement.previousElementSibling)){
          player.parentElement.previousElementSibling.appendChild(player);
     }
});
function reset(){
     dropCount = 0;
     speed = 1000;
     score = 0;
     scores.innerHTML = '0';
     cell.forEach(cell => cell.innerHTML = '');
     playerCell[1].innerHTML = '<div class="player"></div>';
}
reset();
function startGame(){
     reset();
     loop();
}
function loop(){
     let stopGame = false;
     for(let i = enemyCell.length - 1;i >= 0;i--){
          const previousCell = enemyCell[i];
          const nextCell = cell[i + 3];
          const enemy = previousCell.children[0];
          if(!enemy) continue;
          nextCell.appendChild(enemy);
          if(playerCell.includes(nextCell)){
               if(nextCell.querySelector('.player')){
                    stopGame = true;
               }else{
                    score++;
                    speed = Math.max(100,speed - 25);
                    scores.innerHTML = score;
                    enemy.remove();
               }
          }
     }
     if(dropCount % 2 === 0){
          const position = Math.floor(Math.random() * 3);
          enemyCell[position].innerHTML = '<div class="enemy"></div>';
     }
     if(stopGame){
          alert('Your Score ' + score + '. Close This Window to Play Again');
          reset();
     }else{
          dropCount++;
          setTimeout(loop,speed);
     }
}