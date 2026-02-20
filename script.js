let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");
let restartBtn = document.getElementById("restartBtn");

let playerPosition = 175;
let score = 0;
let lives = 3;
let gameRunning = true;
let enemySpawner;

function updateLives() {
    livesDisplay.innerText = "Lives: " + "❤️".repeat(lives);
}

function moveLeft() {
    if (!gameRunning) return;
    if (playerPosition > 0) {
        playerPosition -= 20;
        player.style.left = playerPosition + "px";
    }
}

function moveRight() {
    if (!gameRunning) return;
    if (playerPosition < 350) {
        playerPosition += 20;
        player.style.left = playerPosition + "px";
    }
}

function shoot() {
    if (!gameRunning) return;

    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = playerPosition + 22 + "px";
    bullet.style.bottom = "60px";
    gameArea.appendChild(bullet);

    let bulletInterval = setInterval(() => {

        if (!gameRunning) {
            clearInterval(bulletInterval);
            bullet.remove();
            return;
        }

        let bulletBottom = parseInt(bullet.style.bottom);
        bullet.style.bottom = bulletBottom + 10 + "px";

        if (bulletBottom > 500) {
            bullet.remove();
            clearInterval(bulletInterval);
        }

        let enemies = document.querySelectorAll(".enemy");

        enemies.forEach(enemy => {
            let enemyTop = parseInt(enemy.style.top);
            let enemyLeft = parseInt(enemy.style.left);

            if (
                bulletBottom > (500 - enemyTop - 40) &&
                playerPosition + 22 > enemyLeft &&
                playerPosition + 22 < enemyLeft + 40
            ) {
                enemy.remove();
                bullet.remove();
                clearInterval(bulletInterval);
                score++;
                scoreDisplay.innerText = score;
            }
        });

    }, 30);
}

function createEnemy() {
    if (!gameRunning) return;

    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = Math.floor(Math.random() * 360) + "px";
    enemy.style.top = "0px";
    gameArea.appendChild(enemy);

    let enemyInterval = setInterval(() => {

        if (!gameRunning) {
            clearInterval(enemyInterval);
            enemy.remove();
            return;
        }

        let enemyTop = parseInt(enemy.style.top);
        enemy.style.top = enemyTop + 5 + "px";

        if (enemyTop > 460) {
            enemy.remove();
            clearInterval(enemyInterval);
            lives--;
            updateLives();

            if (lives <= 0) {
                endGame();
            }
        }

    }, 50);
}

function endGame() {
    gameRunning = false;
    clearInterval(enemySpawner);
    restartBtn.style.display = "inline-block";
    alert("Game Over! Final Score: " + score);
}

function restartGame() {
    score = 0;
    lives = 3;
    updateLives();
    scoreDisplay.innerText = 0;

    document.querySelectorAll(".enemy").forEach(e => e.remove());
    document.querySelectorAll(".bullet").forEach(b => b.remove());

    playerPosition = 175;
    player.style.left = playerPosition + "px";

    gameRunning = true;
    restartBtn.style.display = "none";

    enemySpawner = setInterval(createEnemy, 2000);
}

enemySpawner = setInterval(createEnemy, 2000);