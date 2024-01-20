function setup() {
    createCanvas(800, 400); //canvas
}

let playerX = 60;
let playerY = 200;
let leftCloudX = 50;
let rightCloudX = 350;
let velY = 10;
let jumping = false;
let grounded = true;
let leftEnemyX = 900;
let rightEnemyX = 2700;
let middleEnemyX = 1800;
let leftHit;
let midHit;
let rightHit;
let cloudSpeed = 0.5;
let speedX = 10;
let num = 0;
let score = `Score: ${num}`;
let hsNum = 0;
let hs = `High Score: ${hsNum}`;

function draw() {
    background("#07cff7");

    fill("black");
    noStroke();
    textSize(24);
    text(score, 10, 25); //score text
    text(hs, 600, 25);

    fill("black");
    rect(playerX, playerY, 20, 50); //player

    fill("red");
    noStroke();
    rect(leftEnemyX, 370, 20, 20); //enemies
    rect(rightEnemyX, 370, 20, 20);
    rect(middleEnemyX, 370, 20, 20);

    fill("white");
    noStroke();
    rect(leftCloudX, 50, 200, 60); //clouds
    rect(rightCloudX, 50, 200, 60);

    //collision detection
    leftHit = collideRectRect(60, playerY, 20, 50, leftEnemyX, 370, 20, 20);
    midHit = collideRectRect(60, playerY, 20, 50, middleEnemyX, 370, 20, 20);
    rightHit = collideRectRect(60, playerY, 20, 50, rightEnemyX, 370, 20, 20);

    if (leftHit || midHit || rightHit) {
        speedX = 0;
        playerX = 1000;
        playerY = -1000;
    }
}

//if key is pressed
function keyPressed() {
    if (grounded === false) return;

    if (keyCode == "32") {
        jumping = true;
        grounded = false;
    }
}

//gameloop
let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    //gravity
    playerY += 4;
    if (playerY > 340) {
        playerY = 340;
    }

    if (playerY == 340) grounded = true;

    //clouds moving
    leftCloudX -= cloudSpeed;
    rightCloudX -= cloudSpeed;
    if (rightCloudX <= -500 || leftCloudX <= -500) {
        rightCloudX = 900;
        leftCloudX = 1200;
    }
    //jumping
    if (jumping === true) {
        if (playerY >= 235) {
            velY = 12;
            playerY -= velY;
        } else {
            velY = 0;
            jumping = false;
        }
    }

    //enemies moving
    leftEnemyX -= speedX;
    rightEnemyX -= speedX;
    middleEnemyX -= speedX;
    if (leftEnemyX <= -200) {
        leftEnemyX = 2700;
    } else if (rightEnemyX <= -200) {
        rightEnemyX = 1800;
    } else if (middleEnemyX <= -200) {
        middleEnemyX = 900;
    }

    //score
    score = `Score: ${num}`;
    if (leftEnemyX == 60 || middleEnemyX == 60 || rightEnemyX == 60) {
        num++;
    }

    if (speedX === 0) {
        if (num > hsNum) {
            hsNum = num;
            hs = `High Score: ${hsNum}`;
        }

        playerX = 60;
        playerY = 200;
        leftCloudX = 50;
        rightCloudX = 350;
        velY = 10;
        jumping = false;
        grounded = true;
        leftEnemyX = 900;
        rightEnemyX = 2700;
        middleEnemyX = 1800;
        leftHit;
        midHit;
        rightHit;
        cloudSpeed = 0.5;
        speedX = 10;
        num = 0;
        score = `Score: ${num}`;
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
