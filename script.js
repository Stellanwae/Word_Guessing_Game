import { words } from "./words.js"

document.addEventListener("DOMContentLoaded", ()=>{


const landingPage = document.getElementById("landing-page")
const startGame = document.getElementById("start-game")
const theGame = document.getElementById("the-game")
const gameTitle = document.getElementById("game-title")
const wordGuess = document.getElementById("word-guess")
const gameLetters = document.getElementById("game-letters")
const gameStatus = document.getElementById("game-status")
const guessesLeft = document.getElementById("guesses-left")
const gameHint = document.getElementById("game-hint")
let guessesCount = 0
let maxGuessCount = 6

gameTitle.innerHTML = "<h1>Guess a Word</h1>"

startGame.addEventListener("click", removePage)

function removePage(){
    landingPage.style.display = "none"
    theGame.style.display = "block"
    console.log("Hey")
}

let wordObject = words[Math.floor(Math.random()*words.length-1)]
let word = wordObject.word.toUpperCase()
let wordHint = wordObject.hint
let wordArray = word.split("")

let blankArray = Array(wordArray.length).fill("_")

blankArray.forEach((blank, index)=>{
    const guessButton = document.
    createElement("button")
    guessButton.innerText = blank
    guessButton.classList.add("blank-space-button")
    guessButton.setAttribute("data-guessedLetter", index)
    wordGuess.appendChild(guessButton)
})
// Hint 

gameHint.innerHTML = `<p><strong>Hint:</strong> ${wordHint}</p>`

// Alphabets

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const alphabetsArray = alphabets.split("")


alphabetsArray.forEach((wrd, index)=>{
    let alphabetButton = document.createElement("button")
    alphabetButton.innerText = wrd
    alphabetButton.classList.add("blank-space-button")
    alphabetButton.setAttribute("data-letter", wrd)
    

    alphabetButton.addEventListener("click", ()=> checkGuess(alphabetButton))
    gameLetters.appendChild(alphabetButton)
})

let isCorrectGuess = false
function checkGuess(button){
    let guessedLetter = button.getAttribute("data-letter")
    let guessedArray = document.querySelectorAll(".blank-space-button")
    
    wordArray.forEach((letter, index)=>{
        if (guessedLetter == letter){
            blankArray[index]=guessedLetter
            console.log(blankArray)
            guessedArray[index].innerText = letter
            isCorrectGuess=true
        }else {
            isCorrectGuess=false
        }
    
    })
    
    if (!isCorrectGuess){
        guessesCount = maxGuessCount--
        console.log("count: ",guessesCount)
    }
    
    if(guessesCount == 0){
        gameStatus.innerHTML = `<h3>You have ${maxGuessCount} chances 😊</h3>`
    }else if(guessesCount > 0 && guessesCount <= 6){
       gameStatus.innerHTML = `<h3>You have ${guessesCount} chances. You got this 😉 </h3>`
    }else if(guessesCount < 0){
       gameStatus.innerHTML = `<h3>You need to restart, it's a lose 😞</h3>`


    }
}

})