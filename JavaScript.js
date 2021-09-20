class block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var rightArrow = false;
var leftArrow = false;
var upArrow = false;
var downArrow = false;
var snakeLength = 3;
var snakeArr = new Array(snakeLength);
var previousSnakeArr = new Array(snakeLength);
snakeArr[0] = new block(150, 225);
snakeArr[1] = new block(125, 225);
snakeArr[2] = new block(100, 225);
var apple = new block(325, 225);
var direction = "";
var speed = 25;
var isDead = false;

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    setInterval(function () {
        draw();
        decideSnakeMovement();
        if (direction != "" && isDead == false) {
            saveSnakePosition();
            moveSnake();
            eatApple();
            killSnake();
        }
        else if (isDead == true) {
            drawRectangle(130, 225, 260, 50, "#404040", 0, "#404040");
            drawText(135, 255, "20px calibri", "white", "you died :(, your length was " + "" + parseInt(snakeArr.length - 3));
        }
    }, 1000 / 5)
    addEventListener("keydown", onKeyDown);
}

function decideSnakeMovement() {
    if (rightArrow && direction == "left") { direction = "left"; leftArrow = false; rightArrow = false; }
    else if (rightArrow) { direction = "right"; rightArrow = false; }
    if (leftArrow && direction == "right") { direction = "right"; rightArrow = false; leftArrow = false; }
    else if (leftArrow) { direction = "left"; leftArrow = false; }
    if (upArrow && direction == "down") { direction = "down"; downArrow = false; upArrow = false; }
    else if (upArrow) { direction = "up"; upArrow = false; }
    if (downArrow && direction == "up") { direction = "up"; upArrow = false; downArrow = false; }
    else if (downArrow) { direction = "down"; downArrow = false; }
}

function saveSnakePosition() {
    for (var i = 0; i < snakeArr.length; i++) {
        previousSnakeArr[i] = new block(snakeArr[i].x, snakeArr[i].y);
    }
}

function moveSnake() {
    if (direction == "right") { snakeArr[0].x += speed; }
    if (direction == "left") { snakeArr[0].x -= speed; }
    if (direction == "up") { snakeArr[0].y -= speed; }
    if (direction == "down") { snakeArr[0].y += speed; }
    for (var i = 1; i < snakeArr.length; i++) { snakeArr[i] = previousSnakeArr[i - 1]; }
}

function eatApple() {
    //var isAppleOkay = true;
    //while (isAppleOkay) {

    //}
    if (snakeArr[0].x == apple.x && snakeArr[0].y == apple.y) {
        apple.x = getRandomNumber(0, 19) * 25;
        apple.y = getRandomNumber(0, 19) * 25;
        last = snakeArr[snakeArr.length - 1];
        beforeLast = snakeArr[snakeArr.length - 2];
        if (beforeLast.x - last.x == 25) {
            snakeArr[snakeArr.length] = new block(last.x - 25, last.y)
        }
        if (beforeLast.x - last.x == -25) {
            snakeArr[snakeArr.length] = new block(last.x + 25, last.y)
        }
        if (beforeLast.y - last.y == 25) {
            snakeArr[snakeArr.length] = new block(last.x, last.y + 25)
        }
        if (beforeLast.y - last.y == -25) {
            snakeArr[snakeArr.length] = new block(last.x, last.y - 25)
        }
    }
}

function killSnake() {
    if (snakeArr[0].x == -25 || snakeArr[0].x == 500 || snakeArr[0].y == 500 || snakeArr[0].y == -25) {
        isDead = true;
    }
    for (var i = 1; i < snakeArr.length - 1; i++) {
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            isDead = true;
        }
    }
}

function draw() {
    drawRectangle(0, 0, canvas.width, canvas.height, "lightgrey", 1, "black");
    //for (var i = 0; i < 20; i ++) {
    //    for (var j = 0; j < 20; j ++) {
    //        drawRectangle(i * 25, j * 25, 25, 25, "black");
    //    }
    //}
    for (var i = 0; i < snakeArr.length; i++) {
        drawRectangle(snakeArr[i].x, snakeArr[i].y, 25, 25, "limeGreen", 2, "black");
    }
    drawRectangle(apple.x, apple.y, 25, 25, "red");
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 39:
            rightArrow = true;
            break;
        case 37:
            leftArrow = true;
            break;
        case 38:
            upArrow = true;
            break;
        case 40:
            downArrow = true;
            break;
    }
}
