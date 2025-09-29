document.addEventListener("DOMContentLoaded", () => {

    let ball = document.getElementById("ball");

    let posX = 50; // Initial horizontal position
    let posY = 50; // Initial vertical position

    let velocityX = 2; // Horizontal velocity
    let velocityY = 3; // Vertical velocity

    ball.style.left = posX + "px";
    ball.style.top = posY + "px";

    setInterval( function exec() {

        posX += velocityX;

        ball.style.left = `${posX}px`;

        if (posX > 700 || posX <= 0) {
            velocityX = -velocityX;
        }
    }, 10);

})