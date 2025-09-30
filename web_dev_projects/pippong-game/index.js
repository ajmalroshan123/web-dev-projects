document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle")

    let posX = 50; // Initial horizontal position
    let posY = 50; // Initial vertical position

    let velocityX = 2; // Horizontal velocity
    let velocityY = 3; // Vertical velocity

    ball.style.left = posX + "px";
    ball.style.top = posY + "px";

    setInterval( function exec() {

        posX += velocityX;
        posY += velocityY;

        ball.style.left = `${posX}px`;
        ball.style.top = `${posY}px`;

        if (posX > table.offsetWidth - ball.offsetWidth || posX <= 0) {
            velocityX = -velocityX;
        }

        if (posY > table.offsetHeight - ball.offsetHeight || posY <= 0) {
            velocityY = -velocityY;
        }
    }, 7);


    // paddle movement

    let paddlePosY = 0;
    let dPy = 5;

    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 38 && paddlePosY > 0) {
            paddlePosY += (-1) * dPy;
        }
        else if (event.keyCode == 40 && paddlePosY < table.offsetHeight - paddle.offsetHeight)
        {
            paddlePosY += dPy;
        }

        paddle.style.top = `${paddlePosY}px`;
    })

})