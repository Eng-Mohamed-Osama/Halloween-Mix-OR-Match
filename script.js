let cards =  document.querySelectorAll('.card');
let cardsNormalLevel =  document.querySelectorAll('.normal');
let cardsHardLevel =  document.querySelectorAll('.normal-hard');
let flipCounts =  document.querySelector('.flips');
let timeScore =  document.querySelector('.time');
let mainGameAudio = new Audio('Assets/Audio/creepy.mp3');
let gameOverAudio = new Audio('Assets/Audio/gameOver.wav');
let victoryAudio = new Audio('Assets/Audio/victory.wav');
let flipAudio = new Audio('Assets/Audio/flip.wav');
let matchAudio = new Audio('Assets/Audio/match.wav');
let gameTypeIndecator = document.querySelector('.game-Type');
let overlayerItems = Array.from(document.querySelectorAll('.overlayer'));
let overlayerButtonStart = Array.from(document.querySelectorAll('.start'));
let playerName = document.querySelector('#start-game-screen input');
let score = document.querySelector('.score');
// let nextLevel = document.querySelector('.next-level');
let getTheScoreButton = document.querySelector('.get-score');
let getTheScoreButtonFromWin = document.querySelector('.get-score-from-win');
let getBackToTheGameButton = document.querySelector('.get-back-to-game');
let clearThelocalStorageButton = document.querySelector('.delete-all-score');
let gameMessage = document.querySelector('.message');
let scoreTableHead = document.querySelector('.tablescore');

overlayerButtonStart.forEach(item => {
    item.addEventListener('click', () => {
        item.parentNode.classList.remove('visible');
        startTheGame();
    })
})
window.onload = document.querySelector('#start-game-screen').classList.add('visible');
let timers = document.querySelector('.scoreandtime-container .timer');
console.log(scoreTableHead)
function gameType(){
    
    
    document.querySelectorAll('.button-container button').forEach( button => button.addEventListener('click' , (e)=>{
        button.classList.remove('coloration')
        document.querySelectorAll('.button-container button').forEach(el => {
            el.classList.remove('coloration')
        });
        if(e.target.id ==  'Normal'){
            e.target.classList.add('coloration')
            document.querySelector('.content-container').classList.remove('hard-grid-system')
            document.querySelector('.content-container ').classList.remove('impossible-grid-system')
            document.querySelectorAll('.hard').forEach(card=>{card.classList.remove('show')})
            document.querySelectorAll('.impossible').forEach(card=>{card.classList.remove('show')})
            document.querySelector('.game-Type').innerHTML = e.target.id
        }else if(e.target.id == 'Hard'){
            e.target.classList.add('coloration')
            document.querySelector('.content-container ').classList.add('hard-grid-system')
            document.querySelector('.content-container ').classList.remove('impossible-grid-system')
            document.querySelectorAll('.hard').forEach(card=>{card.classList.add('show')})
            document.querySelectorAll('.impossible').forEach(card=>{card.classList.remove('show')})
            document.querySelector('.game-Type').innerHTML = e.target.id
        }else if(e.target.id == "Impossible"){
            e.target.classList.add('coloration')
            document.querySelector('.content-container ').classList.add('impossible-grid-system')
            document.querySelector('.content-container ').classList.remove('hard-grid-system')
            document.querySelectorAll('.hard').forEach(card=>{card.classList.add('show')})
            document.querySelectorAll('.impossible').forEach(card=>{card.classList.add('show')})
            document.querySelector('.game-Type').innerHTML = e.target.id
        }
    })
    )    
}
gameType();

function getTheScorePage(){
        getTheScoreButton.addEventListener('click', ()=>{
        getTheScoreButton.parentNode.classList.add('swing');
        getTheScoreButton.classList.add('swing');
        let socring =  document.querySelector('#scoringTable')
        socring.classList.add('overlayer-score')
        socring.classList.add('visible');
        console.log('worked');
        if(localStorage.length > 0){
            gameMessage.remove();
        }else if (localStorage.length <= 0){
            scoreTableHead.remove();
        }

        
    })
}
getTheScorePage();

function getBackToTheGame(){
    getBackToTheGameButton.addEventListener('click', ()=>{
        getBackToTheGameButton.parentNode.classList.remove('overlayer-score');
        getBackToTheGameButton.classList.remove('visible');
        let gamePage =  document.querySelector('#start-game-screen')
        gamePage.classList.remove('swing')
        getTheScoreButton.classList.remove('swing');
    })
}
getBackToTheGame();

clearThelocalStorageButton.addEventListener('click', ()=>{
    clearThelocalStorageButton.parentNode.prepend(gameMessage);
    scoreTableHead.remove();
    window.localStorage.clear();
})
function startTheGame () {
    let order = ()=>{
        
        cardNumber = [...Array(cards.length).keys()]
        console.log(cardNumber)
        cards.forEach(card =>{
            for(i=0 ; i <= cardNumber.length ; i++){
                number = Math.floor(Math.random() * cardNumber.length);
                card.style.order= number;
            }
            
        })
        console.log(number)
    }
    order();
    cards.forEach(card =>{
        setTimeout(() => {
            
            card.classList.remove('flipped');
            card.classList.remove('dance');
            
        }, (50));
    })
    
    getTheScorePage();
    gameLogic()
    mainGameAudio.play();
}


for(i=0 ; i < localStorage.length ; i++){
    let tableScore = `
                 <tbody>
                   <tr >
                     <td id = "${JSON.parse(localStorage.getItem(localStorage.key(i))).name}" ><span class ="clear-score">X</span>${JSON.parse(localStorage.getItem(localStorage.key(i))).name}</td>
                     <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).Timing}</td>
                     <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).flipScore}</td>
                     <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).gameLevel}</td>
                   </tr>
                </tbody>
                `
            document.querySelector('.tablescore').innerHTML += tableScore;
}

document.querySelectorAll('.clear-score').forEach(el =>{
    el.addEventListener('click', (e)=>{
        e.target.parentNode.parentNode.parentNode.remove();
        console.log(e.target.parentNode.id)
        window.localStorage.removeItem(e.target.parentNode.id)
        if(localStorage.length <=  0){
        scoreTableHead.remove();
        clearThelocalStorageButton.parentNode.prepend(gameMessage);
        }
    })
})

function gameOver(){
    document.querySelector('#lost-game-screen').classList.add('visible');
    let timer = document.querySelector('.scoreandtime-container .timer');
    timer.innerHTML = 100;
    cards.forEach(card =>{
        setTimeout(() => {
            
            card.classList.remove('flipped');
            card.classList.remove('dance');
            
        }, (50));
        
    })
    mainGameAudio.pause();
    mainGameAudio.currentTime = 0
    gameOverAudio.play();
    getTheScorePage();
}

function win(){
    document.querySelector('#won-game-screen').classList.add('visible');
    let timer = document.querySelector('.scoreandtime-container .timer');
    mainGameAudio.pause();
    mainGameAudio.currentTime = 0
    victoryAudio.play();
    let player ={
        name : playerName.value,
        Timing : timeScore.innerHTML,
        flipScore : score.innerHTML,
        gameLevel : gameTypeIndecator.innerHTML
    }

    window.localStorage.setItem(playerName.value, JSON.stringify(player));
    
    // if(player.name === ""){
        
    //     window.localStorage.setItem('guest', JSON.stringify(player));
        
    // }else{
        
    //     window.localStorage.setItem(playerName.value, JSON.stringify(player));
        
    // }
}

function gameLogic(){  
    flipCounts.innerHTML = 0;
    let timer = document.querySelector('.scoreandtime-container .timer');
    timer.innerHTML = 100;
    let StartCount = 100;
    let counter = setInterval(function (){
        let matchArray = document.querySelectorAll('.dance');
        timer.innerHTML = StartCount;
        
        if(StartCount > 0 ){
            
            if(gameTypeIndecator.innerHTML === "Normal" && matchArray.length === cardsNormalLevel.length){
                
                clearInterval(counter);
                
                win();

                // document.querySelector('#won-game-screen').append(nextLevel)
                    

                // nextLevel.innerHTML = "that was easy right ? , let's go a bit harder "

                // nextLevel.addEventListener("click" , ()=>{
                //     // nextLevel.target.classList.add('coloration')
                //     document.querySelector('.content-container ').classList.add('hard-grid-system')
                //     document.querySelector('.content-container ').classList.remove('impossible-grid-system')
                //     document.querySelectorAll('.hard').forEach(card=>{card.classList.add('show')})
                //     nextLevel.parentNode.remove()
                //     // document.querySelectorAll('.impossible').forEach(card=>{card.classList.remove('show')})
                //     cards.forEach(card =>{
                //         setTimeout(() => {
                            
                //             card.classList.remove('flipped');
                //             card.classList.remove('dance');
                            
                //         }, (50));
                //         document.querySelector('.game-Type').innerHTML = "Hard"   
                //     })
                // })


                
                StartCount =100;

            }else if(gameTypeIndecator.innerHTML === "Hard" && matchArray.length === cardsHardLevel.length){
                
                clearInterval(counter);
                
                win();
                // nextLevel.innerHTML = "next Level , You ready !"
                
                StartCount =100;
                
                
            }else if(gameTypeIndecator.innerHTML === "Impossible" && matchArray.length === cards.length){
                
                clearInterval(counter);
                
                win();
                
                StartCount =100;

                // nextLevel.remove()
                
                
            }else{
                
                StartCount--
                
            }
        }else if( StartCount === 0){
            
            gameOver();
            
            clearInterval(counter);
            
        }else{
            
            StartCount--
            
        }
    },1000);  
    
    cards.forEach(card =>{
        flipCountNumber =0;
        card.addEventListener( 'click', () => {
            flipped(card)
            flipCounts.innerHTML = flipCountNumber;
            score.innerHTML = flipCounts.innerHTML;                
            timeScore.innerHTML = 101 - timer.innerHTML;                
        })
    })
}
    
function flipped(card){
    card.classList.add('flipped');
    flipAudio.play();
    cardCount= Array.from(document.querySelectorAll('.card'))
    let arr = cardCount.filter(flipBlock => flipBlock.classList.contains('flipped'));
    console.log(arr)
    if(arr.length === 2){
        stopClicking();
        checkflipped(arr[0] , arr[1]);
    }
}
function stopClicking() {
    cards.forEach(el =>{
        el.classList.add('stop-clicking');
        setTimeout(()=>{
            el.classList.remove('stop-clicking');
        },750)
    });
}   
function checkflipped(card1 , card2){
    if(card1.dataset.name === card2.dataset.name){
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
            card1.classList.add('dance');
            card2.classList.add('dance');
            matchAudio.play();
            flipCountNumber++
    }else{
        flipCountNumber++
        setTimeout(()=>{

            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        },750)
    }  
}