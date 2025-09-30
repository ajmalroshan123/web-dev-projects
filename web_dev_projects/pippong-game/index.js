document.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");

    let posX = 50; // Initial horizontal position
    let posY = 50; // Initial vertical position

    let velocityX = 2; // Horizontal velocity
    let velocityY = 3; // Vertical velocity

    ball.style.left = posX + "px";
    ball.style.top = posY + "px";

    setInterval(function exec() {
        posX += velocityX;
        posY += velocityY;

        ball.style.left = `${posX}px`;
        ball.style.top = `${posY}px`;

        // Paddle collision detection
        if (
            posX < paddle.offsetLeft + paddle.offsetWidth &&
            posX + ball.offsetWidth > paddle.offsetLeft &&
            posY < paddle.offsetTop + paddle.offsetHeight &&
            posY + ball.offsetHeight > paddle.offsetTop
        ) {
            velocityX = -velocityX;
        }

        // Left and right wall collision
        if (posX > table.offsetWidth - ball.offsetWidth || posX <= 0) {
            velocityX = -velocityX;
        }

        // Top and bottom wall collision
        if (posY > table.offsetHeight - ball.offsetHeight || posY <= 0) {
            velocityY = -velocityY;
        }
    }, 15);

    // Paddle movement (keyboard)
    let paddlePosY = paddle.offsetTop; // start at current paddle position
    let dPy = 10;

    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.keyCode === 38 && paddlePosY > 0) {
            // Up arrow
            paddlePosY -= dPy;
        } else if (
            event.keyCode === 40 &&
            paddlePosY < table.offsetHeight - paddle.offsetHeight
        ) {
            // Down arrow
            paddlePosY += dPy;
        }

        paddle.style.top = `${paddlePosY}px`;
    });

    // Paddle movement (mouse)
    document.addEventListener("mousemove", (event) => {
        let mouseDistanceFromTop = event.clientY;
        let tableDistanceFromTop = table.offsetTop;

        // center the paddle on the mouse pointer
        let mousePointControl =
            mouseDistanceFromTop - tableDistanceFromTop - paddle.offsetHeight / 2;

        // Clamp paddle inside table
        if (mousePointControl < 0) {
            paddlePosY = 0;
        } else if (mousePointControl > table.offsetHeight - paddle.offsetHeight) {
            paddlePosY = table.offsetHeight - paddle.offsetHeight;
        } else {
            paddlePosY = mousePointControl;
        }

        paddle.style.top = `${paddlePosY}px`;
    });
});
