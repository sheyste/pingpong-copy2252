let canvas = document.getElementById("table");
let context = canvas.getContext('2d');

const userBar = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "white"
};

const cpuBar = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "white"
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velInXDir: 5,
    velInYDir: 5,
    speed: 7,
    color: "green"
};

const separator = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "white"
};


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let upPressed = false;
let downPressed = false;

function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawSeparator() {
    drawRect(separator.x, separator.y, separator.width, separator.height, separator.color);
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText(userBar.score + " - " + cpuBar.score, canvas.width / 2 - 30, 30);
}


function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(userBar.x, userBar.y, userBar.width, userBar.height, userBar.color);
    drawRect(cpuBar.x, cpuBar.y, cpuBar.width, cpuBar.height, cpuBar.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawSeparator();
    drawScore();
}

function update() {
    if (upPressed && userBar.y > 0) {
        userBar.y -= 5;
    } else if (downPressed && userBar.y < canvas.height - userBar.height) {
        userBar.y += 5;
    }

    ball.x += ball.velInXDir;
    ball.y += ball.velInYDir;

    if (cpuBar.y < ball.y - cpuBar.height / 2) {
        cpuBar.y += ball.speed / 2;
    } else {
        cpuBar.y -= ball.speed / 2;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velInYDir = -ball.velInYDir;
    }

    if (
        (ball.x - ball.radius < userBar.x + userBar.width && ball.y > userBar.y && ball.y < userBar.y + userBar.height) ||
        (ball.x + ball.radius > cpuBar.x && ball.y > cpuBar.y && ball.y < cpuBar.y + cpuBar.height)
    ) {
        ball.velInXDir = -ball.velInXDir;
    }

    if (ball.x - ball.radius < 0) {
        cpuBar.score++;
        reset();
    } else if (ball.x + ball.radius > canvas.width) {
        userBar.score++;
        reset();
    }
}

function reset() {
    userBar.y = (canvas.height - userBar.height) / 2;
    cpuBar.y = (canvas.height - cpuBar.height) / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

function draw() {
    draw.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(userBar.x, userBar.y, userBar.width, userBar.height, userBar.color);
    drawRect(cpuBar.x, cpuBar.y, cpuBar.width, cpuBar.height, cpuBar.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawSeparator();
    drawScore();
}

function gameLoop() {
    update();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
