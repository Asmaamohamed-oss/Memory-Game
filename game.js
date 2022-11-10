
// Spalsh Screen
const cards = document.querySelectorAll(".cards .card");
const spalsh = document.querySelector(".splash");
const start_btn = document.querySelector(".splash button");
const infoBox = document.querySelector(".info-box span.name")
let userName;
let handel;
let timer = document.querySelector(".info-box .timer");
start_btn.addEventListener("click",(e)=>{
    userName = prompt("What is Your Name?");
    if(!userName){
        userName = "UnKnown"
    }
    infoBox.textContent = userName;
    spalsh.remove();

    // Timer 
    // Start timer after start game
    handel = setInterval(timerFunction,1000);
    
    /// Show all Cards At First 
    showAllCards()
})

function showAllCards(){
    cards.forEach(card => card.classList.add("is-flipped"))
    setTimeout((e)=>{
        cards.forEach(card => card.classList.remove("is-flipped"))
    },1500)
}


/// Timer logic
let seconds = 60;
let minutes = 1;
// Count Minutes And Seconds
let countSeconds = 0;
let countMinutes = 0;
function timerFunction(){
    if(seconds == 0){
        --minutes;
        seconds = 60;
    }
    --seconds;

    // Count Minutes And Seconds
    if(countSeconds === 60){
        ++countMinutes;
        countSeconds = 0
    }
    ++countSeconds;
    //
    if(seconds === 0 && minutes === 0){
            //Run gameOver() function
            clearInterval(handel)
            gameOver()
    }
    timer.innerHTML = `0${minutes}:${seconds < 10 ? '0'+seconds:seconds}`;
    countingTime(countSeconds,countMinutes)
    //Game Over
    
}



/// Shuffling
const container = document.querySelector(".cards");

const arrayCards = [...cards];

//Create Range of keys
const orderRange = [...Array(arrayCards.length).keys()];

//Shuffling Function 

function shuffle(array){
    let current = array.length,
        temp,
        random

    while (current > 0) {
        
        random =Math.floor(Math.random() * current)
        current--;
        //Swapping between current element and random element
        //[1]Save Current Element in the temp(stash)
            temp = array[current];
        //[2]Current Element = Random
            array[current] = array[random];
        //[3]Random = Current Ele in the temp(stash)
            array[random] = temp;
    }
    return array
}

//Add Css Order Property To Game Cards
shuffle(orderRange)
    arrayCards.forEach(function(card,index){
    //Add order propery
    card.style.order = orderRange[index];
    //Add click Event
    card.addEventListener("click",(e)=>{
        //Trigger flipedcard()
        flipedCard(card)
    })
})
//Flip Card Function 

function flipedCard(card){
    //Add is-Flipped class
    card.classList.add("is-flipped");
    //Collect All flipped cards
    let flippedCardsArr =arrayCards.filter(function(card){
        return card.classList.contains("is-flipped")
    })
    // If There is Two flipped Cards
    if(flippedCardsArr.length === 2){
        //If Two Cards  Selected
        //[1] Stop Clicking Function
        stopClicking();
        //[2] Check Matching Block Function
        matchingCards(flippedCardsArr[0],flippedCardsArr[1])
        //[3] After open all cards => Game is finished
        if(checkAllMatchCards()){
            setTimeout(()=>{
                // Show win Screen
                showWinScreen();
                // stop timer
                clearInterval(handel);
            },duration)
        }
    }
}
// Stop Clicking Function
let duration = 1000;
// let tries = 0;
function stopClicking(){
    container.classList.add("no-clicking");
    setTimeout(()=>{
        //Remove no-clicking class 
        container.classList.remove("no-clicking");
    },duration)
}


function matchingCards(fristCard,secondCard){
    let triesEle = document.querySelector("span.tries");
    let dataTech_1 = fristCard.dataset.tech;
    let dataTech_2 = secondCard.dataset.tech;
    if(dataTech_1 === dataTech_2){
        fristCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");

        fristCard.classList.add("has-match");
        secondCard.classList.add("has-match");
        document.querySelector("#win").play();
    }else{
        triesEle.innerHTML = parseInt(triesEle.innerHTML) + 1 ;
        document.querySelector("#lose").play();
        setTimeout(()=>{
            //Remove no-clicking class 
            fristCard.classList.remove("is-flipped");
            secondCard.classList.remove("is-flipped");
        },duration)
    }
}

/// Check if all cards matched
function checkAllMatchCards(){
    const allCardsHasMatched = arrayCards.every(function(card){
    return card.classList.contains("has-match")
})
    return allCardsHasMatched;
}


// Writing Counting time in the header
function countingTime(seconds,minutes){
    if(checkAllMatchCards()){
        timer.innerHTML = `0${minutes}:${seconds < 10 ? '0'+seconds:seconds}`;
    }
}


/// Show & Hide Win Screen
const winScreen = document.querySelector(".win-screen");
const winnerName = document.querySelector(".winner span");
const winTime = document.querySelector(".timer span");
const wrongTries = document.querySelector(".tries span");
const closeWinScreenBtn = document.querySelector(".win-screen .close-msg");
const restartBtn = document.querySelectorAll(".restart-game");


function showWinScreen(){
    winScreen.classList.add("show-screen");
    winnerName.innerHTML = userName;
    wrongTries.innerHTML = document.querySelector("span.tries").innerHTML;
    winTime.innerHTML = timer.innerHTML;
}

closeWinScreenBtn.addEventListener("click",(e)=>{
    winScreen.classList.remove("show-screen");
    winScreen.classList.add("hide-screen");
    //Add Restart Btn To Header
    restartBtn.forEach((btn)=>{
        btn.classList.add("show-restart")
    })
})




///Game over
const failScreen = document.querySelector(".fail-screen");
function gameOver(){
    //[1]
    document.querySelector("#lose").play();
    //[2] show popup
    failScreen.classList.remove("hide-screen");
    failScreen.classList.add("show-screen");
}

// Hide Fail Screen
const closefailScreenBtn = document.querySelector(".fail-screen .close-msg");
closefailScreenBtn.addEventListener("click",(e)=>{
    failScreen.classList.remove("show-screen");
    failScreen.classList.add("hide-screen");
    //Add Restart Btn To Header
    restartBtn.forEach((btn)=>{
        btn.classList.add("show-restart")
    })
})

restartBtn.forEach(function(btn){
    btn.addEventListener("click",(e)=>{
         /// Show all Cards At First 
        showAllCards()
        //Remove Restart Btn From Header
        restartBtn.forEach((btn)=>{
            if(btn.classList.contains("show-restart")){
                btn.classList.remove("show-restart")
            }
        })
        //Remove has-match class from all cards
        arrayCards.forEach(card => card.classList.remove("has-match"));
        //close screen
        winScreen.classList.remove("show-screen");
        // Restart Game
        shuffle(orderRange)
        arrayCards.forEach(function(card,index){
            //Add order propery
            card.style.order = orderRange[index];
        })
        // Reset wrongtries
        document.querySelector("span.tries").innerHTML = 0;
        // Reset timer 
        timer.innerHTML = '2:00';
        seconds = 60;
        minutes = 1;
        countMinutes = 0;
        countSeconds = 0;
        handel = setInterval(timerFunction,1000);

        //Hide Fail screen if it there
        if(failScreen.classList.contains("show-screen")){
            failScreen.classList.remove("show-screen");
            failScreen.classList.add("hide-screen");
        }
    })
})


