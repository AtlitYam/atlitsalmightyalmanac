// Global vars
let currentRound = 0
let computerScore = 0
let playerScore = 0

// Select elements
const currentRoundField = document.querySelector('.current-round')
const roundWinnerField = document.querySelector('.round-winner')
const computerScoreField = document.querySelector('.computer-score')
const playerScoreField = document.querySelector('.player-score')
const errorField = document.querySelector('.error')
const gameDiv = document.querySelector('.game')
const winnerDiv = document.querySelector('.winnerDiv')
const winnerText = document.querySelector('.winner')
const playButtons = document.querySelectorAll('.play-button')
const playMultipleGamesButton = document.querySelector('.multiple-games')
const playAgainButton = document.querySelector('.play-again-button')
const finalComputerScoreField = document.querySelector('.final-computer-score')
const finalPlayerScoreField = document.querySelector('.final-player-score')
const computerPlayed = document.querySelector('.computer-played')
const playerPlayed = document.querySelector('.player-played')

// Add listeners
playButtons.forEach(button => button.addEventListener('click', function () {
    roundWinnerField.textContent = handleRoundResult(playRound(currentRound, this.dataset.choice))
    currentRoundField.textContent = ++currentRound
}))

playMultipleGamesButton.addEventListener('click', function () {
    const numberOfRounds = Number(document.querySelector('.games-amount').value)
    const targetScore = Number(document.querySelector('.target-score').value)
    if (!numberOfRounds || numberOfRounds < 1 || numberOfRounds > 50000) {
        console.log("error")
        errorField.textContent = 'Please only use numbers between 1 and 50000!'
        return // Invalid input
    }
    if (!targetScore || targetScore < 1 || targetScore > 50000) {
        console.log("error")
        errorField.textContent = 'Please only use numbers between 1 and 50000!'
        return // Invalid input
    }
    errorField.textContent = ''
    game(numberOfRounds, targetScore)
})

playAgainButton.addEventListener('click', function () {
    currentRound = 0
    computerScore = 0
    playerScore = 0

    roundWinnerField.textContent = "Play the first round!"
    computerPlayed.textContent = ""
    playerPlayed.textContent = ""
    currentRoundField.textContent = 0
    computerScoreField.textContent = 0
    playerScoreField.textContent = 0

    gameDiv.style.display = "block"
    winnerDiv.style.display = "none"
})

// Main flow functions

function game(rounds, targetScore) {
    let i = 0
    let continueGame = true
    while (continueGame && i < rounds + 1) {
        let roundResult = playRound(i)
        handleRoundResult(roundResult, targetScore)
        currentRoundField.textContent = i
        console.log(playerScore)
        console.log(computerScore)

        playerScore >= targetScore || computerScore >= targetScore ? continueGame = false : continueGame = true
        i++
    }
    console.log(determineGameResult())
}

function playRound(round, playersPick) {
    console.log("Now playing round " + round)
    const computersPick = getComputersPick()
    if (!playersPick) {
        playersPick = getComputersPick()
    }

    computerPlayed.textContent = "Computer has picked: " + computersPick
    playerPlayed.textContent = "Player has picked: " + playersPick

    return determineRoundResult(playersPick, computersPick)
}

// Pick functions

function getComputersPick() {
    return convertPick(Math.floor(Math.random() * 3) + 1)
}

function getPlayersPick() {
    return prompt("Please enter your pick").toLowerCase()
}

function convertPick(computersPick) {
    switch (computersPick) {
        case 1:
            return "Rock"
        case 2:
            return "Paper"
        case 3:
            return "Scissors"
    }
}

// Result functions

function isRoundTie(playersPick, computersPick) {
    return playersPick === computersPick
}

function isPlayerWinsRound(playersPick, computersPick) {
    return playersPick === "Rock" && computersPick === "Scissors" ||
        playersPick === "Scissors" && computersPick === "Paper" ||
        playersPick === "Paper" && computersPick === "Rock"
}

function determineRoundResult(playersPick, computersPick) {
    if (isRoundTie(playersPick, computersPick)) {
        console.log("It's a tie! Round over.")
    } else if (isPlayerWinsRound(playersPick, computersPick)) {
        console.log("The player wins the round!")
        return "Player"
    } else {
        console.log("The computer wins the round!")
        return "Computer"
    }
}

function determineGameResult() {
    return playerScore > computerScore ? "The player wins the game!" : playerScore === computerScore ? "It's a tie! Game over." : "The computer wins the game!"
}

function handleRoundResult(roundResult, targetScore = 5) {
    let winner = ''
    roundResult === 'Player' ? winner = updatePlayerScore() : roundResult === 'Computer' ? winner = updateComputerScore() : winner = "The round was a tie!"

    if (playerScore >= targetScore || computerScore >= targetScore) {
        gameDiv.style.display = "none"
        winnerText.textContent = playerScore > computerScore ? 'Player' : 'Computer'
        finalComputerScoreField.textContent = computerScore
        finalPlayerScoreField.textContent = playerScore
        winnerDiv.style.display = "block"
    }

    return winner
}

function updatePlayerScore() {
    playerScoreField.textContent = ++playerScore
    return 'Player'

}

function updateComputerScore() {
    computerScoreField.textContent = ++computerScore
    return 'Computer'
}