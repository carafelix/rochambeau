// General Plan; goals, input, expected result, rules, ideas.

// The objective of this proyect is to allow the user to play a simple
// Rock-Paper-Scissors game against the computer; first via text input-output form, and later with a GUI

// Cpu choices must only be initialized after the user already selected a weapon of choice
// so no cheating its allowed prior. Since the machine selects its own weapon on random, there is no problem on letting it select after
// Draws should not count towards the scores but should be registered in the total rounds count.
// Would do multiple iterations to get the flow of it

// Ideas: 
// Make the user able to select if he wants to play a golden goal round, a best of 3 , a Fto5 or a Fto10.
// Implement random.org API for cpuChoice, so it is trully random.
// Hestiation is defeat, maybe with a counter like when kids slap their fist into the other hand for count. 
// Maybe implement a Voice-Recognition Library to allow the user to shout like a kid to the computer hahaha.
// GUI visualitation of rounds/score record.


// Pseudocode

// Ask the user if he wants to play a game of Rochambeu, and to wich score  |   *5
// Give the user and the machine a counter for score (or lifes)             |   *6
// Define the elementary inputs regarding the game                          |   *0
// Ask the user to input his choice via prompt and normalize the string     |   *1
// Computer selects a random choice                                         |   *2
// Play and determine if it is a Tie or any of the parties won              |   *3
// If someome won, score them a point                                       |   *4
// Reset computer choice and answer for the player next choice              |   *7
// Loop until the selected amount of score is reached by one of the parties |   *8
// Display the winning partie                                               |   *9
// ask the user if he want to play another set and loop                     |   *10


// In this first iteration I would not implement the conditional for cpu choice to await for human choice
// Since I think im missing the point on it and getting a bit stuck, and want to continue. I would revisit.

// normalize function 

function uniformInput(string) {   
    const uniform = string.toLowerCase();
    const excludeFirstLetter = uniform.slice(1);
    const getFirstLetter = uniform.slice(0,1);
    const firstCap = getFirstLetter.toUpperCase();
    return firstCap + excludeFirstLetter;    
}

const rock = "Rock"
const paper = "Paper"
const scissors = "Scissors"

// *1 verb for asking the user for a choice

function getUserChoice() {
    return prompt("Chose your weapon", "Rock, Paper, Scissors")    
}

// *1.1 normalize User Choice

let usrChoiceStep = getUserChoice();
let usrChoice = uniformInput(usrChoiceStep);

// *2 Cpu choice

function getCpuChoice(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const cpuChoice = array[randomIndex];
    return cpuChoice;
}

const cpuChoiceArray = [rock, paper, scissors]

cpuChoice = getCpuChoice(cpuChoiceArray)

// Play a game *3

let playAgame = function (usr, cpu) {
    if (usr == cpu) {
        return("It's a tie baby!")
    } else if ((usr == paper && cpu == rock) 
    || (usr == rock && cpu == scissors)
    || (usr == scissors && cpu == paper)) {
        return(`You Win! strike with ${usr} and Cpu got hit hard with his ${cpu}, poor machine`)
    } else {
        return(`Cpu wins again baby! Your ${usr} is nothing compared to the Cpu ${cpu}`)
    }
}

console.log(playAgame(usrChoice, cpuChoice));

















    






































// trash can: 

// code was inside functions that got deleted, it was okay for avoiding getting wrong inputs
// and letting the user know but was getting pretty messy


// if (string == null || string == undefined) {
//     alert("Please enter a valid answer")
// } else {


// if (usrChoice == "Rock") {
//     return usrChoice = rock
// } else if (usrChoice == "Paper") {
//     return usrChoice = paper
// } else if (usrChoice == "Scissors") {
//     return usrChoice = scissors
// } else if (usrChoice == "") {
//     alert("You going empty handed!")
// } else if (usrChoice == null) {
// } else {
//     usrChoice = undefined
//     alert("What are you doing??? Going to battle with words?")
// }

// Writing this code after implementing *2 since I also haved another way to solve it



// function cpuCpu () {
//     return Math.floor((Math.random() * 3)+1)
// }

// let cpuGuess = cpuCpu();

//     if (cpuGuess == 1) {
//         cpuGuess = rock
//     } else if (cpuGuess == 2) {
//         cpuGuess = paper
//     } else {
//         cpuGuess = scissors
//     }


