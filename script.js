//Animasyonu geciktirme

setTimeout(() => {
    document.body.classList.remove('preload');
}, 500);
const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    }
];

//DOM 
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.rules-container');
btnRules.addEventListener("click", () => {
    if (!modalRules.classList.contains("show-modal")) {
      modalRules.classList.add("show-modal");
    }
  });
  
  btnClose.addEventListener("click", () => {
    if (modalRules.classList.contains("show-modal")) {
      modalRules.classList.remove("show-modal");
    }
  });
const choiceButtons = document.querySelectorAll('.game-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.result');
const resultDivs = document.querySelectorAll('.results-result');
const resultWinner = document.querySelector('.result-win');
const resultText = document.querySelector('.result-text');
const playAgainBtn = document.querySelector('.play-again');
const scoreNumber = document.querySelector('.score-number');

let score = 0;

choiceButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const choices = ["paper", "scissors", "rock"];
      const choice = choices[index];
      choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([{ name: choice }, aichoice]);
    displayWinner([{ name: choice }, aichoice]);
}
  
function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="game-${results[idx].name}">
            <img src="./image/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}


function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "you win";
        resultDivs[0].classList.toggle("winner");
        keepScore(1);
      } else if (aiWins) {
        resultText.innerText = "you lose";
        resultDivs[1].classList.toggle("winner");
        keepScore(-1);
      } else {
        resultText.innerText = "draw";
        keepScore(0);
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }

  function isWinner(results) {
    const playerChoice = results[0].name;
    const aiChoice = results[1].name;

    if (playerChoice === aiChoice) {
        return false;  // Berabere
    }

    return CHOICES.find(choice => choice.name === playerChoice).beats === aiChoice;
}
  
function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;
}

playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});

