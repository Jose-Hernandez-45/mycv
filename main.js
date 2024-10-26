window.addEventListener("load", function () {
    console.log("entre");
    document.getElementById("load").classList.toggle("load2");
});



document.addEventListener("DOMContentLoaded", function() {
    // Get all icons
    var icons = document.querySelectorAll('.icon');

    // For each icon, add an event listener
    icons.forEach(function(icon) {
        icon.onclick = function() {
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById(modalId);
            modal.style.display = 'block';
        }
    });

    // Get all close buttons
    var closeBtns = document.querySelectorAll('.close');

    // For each close button, add an event listener to close the modal
    closeBtns.forEach(function(btn) {
        btn.onclick = function() {
            var modal = this.closest('.modal');
            modal.style.display = 'none';
        }
    });

    // Close modal if clicked outside of the modal content
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };
});



const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');
        const scoreBoard = document.getElementById('scoreBoard');
        const pauseButton = document.getElementById('pauseButton');

        // Paletas
        const paddleHeight = 50;
        const paddleWidth = 10;
        let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
        let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

        // Pelota
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballRadius = 5;
        let ballSpeedX = 5;
        let ballSpeedY = 5;

        // Puntuación
        let playerScore = 0;
        let aiScore = 0;

        // Control de teclas
        const keys = {};

        // Control de pausa
        let isPaused = false;

        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
        });

        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });

        pauseButton.addEventListener('click', togglePause);

        function togglePause() {
            isPaused = !isPaused;
            pauseButton.textContent = isPaused ? "Reanudar" : "Pausar";
            if (!isPaused) {
                gameLoop();
            }
        }

        function movePlayerPaddle() {
            if (keys['w'] && leftPaddleY > 0) leftPaddleY -= 4;
            if (keys['s'] && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 4;
        }

        function moveAIPaddle() {
            const paddleCenter = rightPaddleY + paddleHeight / 2;
            if (paddleCenter < ballY - 25) {
                rightPaddleY += 3;
            } else if (paddleCenter > ballY + 30) {
                rightPaddleY -= 3;
            }
        }

        function moveBall() {
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Rebote en paredes superior e inferior
            if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
                ballSpeedY = -ballSpeedY;
            }

            // Rebote en paletas
            if (
                (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
                (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
            ) {
                ballSpeedX = -ballSpeedX;
            }

            // Puntuación y reinicio si la pelota sale del canvas
            if (ballX < 0) {
                aiScore++;
                resetBall();
            } else if (ballX > canvas.width) {
                playerScore++;
                resetBall();
            }

            updateScore();
        }

        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;
        }

        function updateScore() {
            scoreBoard.textContent = `You: ${playerScore}        Programmer: ${aiScore}`;
        }

        function draw() {
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar paletas
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

            // Dibujar pelota
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Dibujar mensaje de pausa
            if (isPaused) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('PAUSADO', canvas.width / 2, canvas.height / 2);
            }
        }

        function gameLoop() {
            if (!isPaused) {
                movePlayerPaddle();
                moveAIPaddle();
                moveBall();
                draw();
                requestAnimationFrame(gameLoop);
            }
        }
gameLoop();
