const mainColorButton = document.querySelector("[data-testid='colorBox']");
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const scoreDisplay = document.querySelector("[data-testid='score']");
const newGameButton = document.querySelector("[data-testid='newGameButton']");

let score = 0;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateGameStatus(message, statusClass) {
  // Clear previous status classes
  gameStatus.classList.remove('correct', 'wrong', 'hidden');

  // Add the new class for animation
  gameStatus.classList.add('game-status', statusClass);
  gameStatus.textContent = message;
  gameStatus.style.color = statusClass === "correct" ? "green" : "red"; 

  setTimeout(() => {
      gameStatus.classList.remove(statusClass);
  }, 2000); 
}

function startNewGame() {
    gameStatus.textContent = "";

    const colors = Array.from({ length: 6 }, () => getRandomHexColor());
    const targetColor = colors[Math.floor(Math.random() * colors.length)];

    mainColorButton.style.backgroundColor = targetColor;
    mainColorButton.textContent = ""; 
    mainColorButton.disabled = true;  

    const optionColorButtons = document.querySelectorAll("[data-testid='colorOption']");

    optionColorButtons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];

        button.onclick = () => {
            if (button.style.backgroundColor === mainColorButton.style.backgroundColor) {
              updateGameStatus("Correct! 🎉", "correct"); 
                score++;
                updateScoreDisplay();
                setTimeout(startNewGame, 2000); // Start new game after 2 seconds
            } else {
              updateGameStatus("Wrong! Try Again!", "wrong"); 
            }
        };
    });
}

updateScoreDisplay();
startNewGame();
newGameButton.addEventListener("click", () => {
  score = 0;  
  updateScoreDisplay();  
  startNewGame();  
});