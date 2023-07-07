// all this should be wrapp inside a function to pass to the main js
// to-do // hesitation();

//#region ------------- Nodes ------------------ 

const gamediv = document.querySelector('#gamediv');
const topDiv = document.querySelector('#topdiv');
const botDiv = document.querySelector('#botdiv');
const btnPlay = document.querySelector('#play');

const sliderDiv = document.createElement('div')
const sliderRounds = document.createElement('input'); 
const sliderOutput = document.createElement('output');
const btnRounds = document.createElement('button');
const pTopDiv = document.querySelector('p');

const pMidDiv = document.querySelector('#scores');

const imgLeft = document.querySelectorAll('.left');
const imgRight = document.querySelectorAll('.right');

const leftDiv = document.querySelector('#leftdiv');
const rightDiv = document.querySelector('#rightdiv')

const settingsBtn = document.querySelector('#settings-btn');
const infoBtn = document.querySelector('#info-btn');

const settings = document.createElement('div'); settings.setAttribute('id','settings');
const info = document.createElement('div'); info.setAttribute('id','info');

const bgsliderDiv = document.createElement('div'); 
const bgSlider = document.createElement('input'); 
const effectSliderDiv = document.createElement('div'); 
const effectSlider = document.createElement('input'); 

const darkToggleDiv = document.createElement('div');
const darkToggleSpan = document.createElement('span'); 
const darkToggle = document.createElement('span'); darkToggle.classList.add('material-symbols-rounded');

//#endregion




//#region --------- card atributtes

const usrCards = document.createElement('div')
const btnRock = document.createElement('button');
const btnPaper = document.createElement('button');
const btnScissors = document.createElement('button');
const cardsArr = [btnRock, btnPaper, btnScissors];
cardsArr.forEach(card => card.classList.add('cards'));
cardsArr.forEach(card => card.classList.add('hoverable'));


// ---------- animations for cards
const removeHover = function (){
    cardsArr.forEach(card => card.classList.remove('hoverable'));

}

const addHover = function(){
    cardsArr.forEach(card => card.classList.add('hoverable'));
}

function fadeCard(){
    this.classList.add('animate__bounceOut');
    cardsArr.forEach(card => card.disabled = true);
    removeHover();
}


function cardIn(e){
    if (e.animationName == 'bounceOut') {
        e.target.classList.add('animate__backInUp');
        e.target.classList.remove('animate__bounceOut');        
        setTimeout(() => {            
            cardsArr.forEach(card => card.classList.remove('animate__backInUp'));
            cardsArr.forEach(card => card.disabled = false);
            addHover();
        }, 2500);
    }
}

//#endregion




//#region -------- monster show -------

function usrImgSelect(usr, cpu){
    if (usr == cpu) {
        imgLeft[3].classList.add('show'); 
    } else if (usr == rock){
        imgLeft[0].classList.add('show');
    } else if (usr == paper){
        imgLeft[1].classList.add('show');
    } else if (usr == scissors){
        imgLeft[2].classList.add('show');
    }    
}

function cpuImgSelect(cpu, usr){
    if (usr == cpu) {
        imgRight[3].classList.add('show');
    } else if (cpu == rock){
        imgRight[0].classList.add('show');
    } else if (cpu == paper){
        imgRight[1].classList.add('show');
    } else if (cpu == scissors){
        imgRight[2].classList.add('show');
    }
}

function clearImg(){
    imgLeft.forEach(img => img.classList.remove('show'));
    imgRight.forEach(img => img.classList.remove('show'));
}


//#endregion




//#region --------- slider attributes -----------

sliderDiv.setAttribute('id', 'slider-div');
sliderRounds.setAttribute('id','slider-rounds');
sliderRounds.setAttribute('type','range');
sliderRounds.setAttribute('value','5');
sliderRounds.setAttribute('min', '1');
sliderRounds.setAttribute('max','15');
sliderRounds.addEventListener('input', () => sliderOutput.value = sliderRounds.value);

// ---------- slider output random color ---------

function sliderColorRandom(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    const newColor = "rgb(" + red + "," + green + "," + blue + ")";
    return newColor;
}


//#endregion




//#region --------- rps variables ----------

// rps weapons

const rock = "Rock"
const paper = "Paper"
const scissors = "Scissors"

// rps variables
let usrSpam = false;
let bestOfX = 0; 
let usrScore = 0;
let cpuScore = 0;
let roundCount = 0;
let usrChoice = null;
let cpuChoice;

//#endregion




//#region --------- get cpu choice from pseudo-random ------------

    const cpuChoiceArray = [rock, paper, scissors]

    function getCpuChoice(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
    } 
//#endregion




//#region --------- get cpu choice from randomg.org --------------

    // store response obj arr

    const randomOrg = []; 

    // Api passed Obj

    const apiFetchObj = {
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": "aa28fec6-cdad-47f8-b471-cc8ee106298f", // I know this shouldn't be public but idk how to keep it secret in a front-end enviroment
            "n": 1,
            "min": 1,
            "max": 3,
            "replacement": true,
            "base": 10,
            "pregeneratedRandomization": null
        },
        "id": 27714
    }

    // random.org api function call

    async function getRandomCpu() {
    await fetch("https://api.random.org/json-rpc/4/invoke", {
            method: "POST",
            body: JSON.stringify(apiFetchObj),
            headers: {"Content-type": "application/json; charset=UTF-8"}   
        })
            .then(res => res.json())
            .then((data) =>{
                randomOrg.unshift(data)
                // randomOrg = data; // works but want to store them
            })
            .then(setCpuChoice);
            return cpuChoice
    };

//#endregion




//#region  --- setCpuChoice

const setCpuChoice = function(){
    if ((randomOrg[0]["result"]["random"]["data"][0]) === 0){
        cpuChoice = rock
    } else if ((randomOrg[0]["result"]["random"]["data"][0]) === 1 ) {
        cpuChoice = paper
    } else if ((randomOrg[0]["result"]["random"]["data"][0]) === 2 ) {
        cpuChoice = scissors
    } else {
        console.log("API call rejected or too late, true random was compromise")};
        cpuChoice = getCpuChoice(cpuChoiceArray);
    }


//#endregion




//#region --------- prevent spam function, nested playround--------               // setInterval could be used as event listener // noted. if I want to prevent something, better catch it on the if statement than in the 'else'


const noSpamPlayRound = async function(rps){
    if (!usrSpam) {
        usrSpam = true;
        setTimeout(clearUsrSpam, 3000);
        playTrueRound(rps, await getRandomCpu());
    } else {
        console.log('you must wait my man');
        
    }
}

const clearUsrSpam = function(){
    usrSpam = false;
}

//#endregion




//#region --------- play round function ----------- 

    async function playTrueRound (usr, cpu) {        
        clearImg();
        usrImgSelect(usr, cpu); cpuImgSelect(cpu, usr);
        
            if (usr === cpu) {

                

                ++roundCount
                pMidDiv.textContent = `${usrScore} - ${cpuScore}`;  
                pTopDiv.innerText = `It's a tie baby!`;

                    if (!(checkGameLose())) {
                        effectTie.play()  
                    }
                            

            } else if ((usr === paper && cpu === rock)    || 
                    (usr === rock && cpu === scissors) ||
                    (usr === scissors && cpu === paper)) {

                        

                        ++roundCount
                        ++usrScore;
                        pMidDiv.textContent = `${usrScore} - ${cpuScore}`;
                        pTopDiv.innerText = `Human Will can go against all odds!`;

                            if (!(checkGameLose())) {
                                effectWin.play()  
                            }
                                       

            } else {
                        
                        
                        ++roundCount
                        ++cpuScore;               
                        pMidDiv.textContent = `${usrScore} - ${cpuScore}`;                    
                        pTopDiv.innerText = `Entrophy will be against humans no matter what.`;

                            if (!(checkGameLose())) {
                                effectWin.play()  
                            }
            }
}



        
//#endregion




//#region --------- check if someone as lost ----------------------

        
        
    const checkGameLose = function(){  // here I must transition into endscreen
            
            if (usrScore > (Math.floor(bestOfX/2)) || cpuScore > (Math.floor(bestOfX/2))) { //check if someone has 50% + 1

                if ((usrScore - cpuScore) >= 1) {     // Final win/loss determination

                    effectBigWin.play();
        
                    pTopDiv.innerText = `Humankind Strikes Again! ${usrScore} is clearly more than ${cpuScore}. Learn to count, universe!`;
                    cpuScore = 0;
                    usrScore = 0;
                    roundCount = 0;
                    clearImg();
                    return true;

                } else if (((cpuScore - usrScore) >= 1) ) {
                    
                    effectBigLose.play();

                    pTopDiv.innerText = `Chaos took over! Universe: ${cpuScore} Humanity: ${usrScore}.`;
                    usrScore = 0;
                    cpuScore = 0;
                    roundCount = 0;
                    clearImg();
                    return true;
                } else {
                    return false;
                }
        }         
};
            
        

//#endregion



//#region --------- set rounds function ----------

function setRounds (rounds){

    bestOfX = rounds;
}
//#endregion




//#region  --------- Round Screen

const roundScreen = function(){
    botDiv.removeChild(btnPlay); 
    sliderDiv.appendChild(sliderRounds);
    sliderOutput.textContent = '5';
    botDiv.appendChild(sliderDiv);
    sliderDiv.appendChild(sliderOutput);
    botDiv.appendChild(btnRounds);
    btnRounds.setAttribute('id', 'rounds');
    btnRounds.innerText = 'rounds';
    sliderRounds.addEventListener('change', () => {
    sliderOutput.style.color = sliderColorRandom();
    });
    pTopDiv.textContent = "Select the 'best of' how many rounds you want to play for";

} 

btnPlay.addEventListener('click', roundScreen);  // homescreen > round screen   

//#endregion




//#region  --------- Play Screen -----------


const playScreen = function(){
    botDiv.removeChild(sliderDiv);
    botDiv.removeChild(btnRounds)
    usrCards.appendChild(btnRock);
    usrCards.appendChild(btnPaper);
    usrCards.appendChild(btnScissors);
    cardsArr.forEach(card => card.classList.add('animate__animated'));
    cardsArr.forEach(card => card.addEventListener('click', fadeCard));
    cardsArr.forEach(card => card.addEventListener('animationend', cardIn));
    usrCards.setAttribute('id','usr-cards')
    botDiv.appendChild(usrCards);
    setRounds(sliderRounds.value);
    pTopDiv.innerText = "Choose wisely";

}

btnRounds.addEventListener('click', playScreen) // roundscreen > playscreen

//#endregion




//#region ------------ rps buttons atributes ---------

btnRock.setAttribute('id','rock');
// btnRock.innerText = "Rock";
btnRock.addEventListener('click', async () => noSpamPlayRound(rock));

btnPaper.setAttribute('id','paper');
// btnPaper.innerText = "Paper";
btnPaper.addEventListener('click', async () => noSpamPlayRound(paper));


btnScissors.setAttribute('id','scissors'); 
// btnScissors.innerText = "Scissors";
btnScissors.addEventListener('click', async () => noSpamPlayRound(scissors));


//#endregion




//#region ------------ music volume slider ----------------

bgSlider.setAttribute('id','slider-bg');
bgSlider.classList.add('config-slider');
bgSlider.setAttribute('type','range');
bgSlider.setAttribute('value','2');
bgSlider.setAttribute('min', '0');
bgSlider.setAttribute('max','100');
bgSlider.addEventListener('input', () =>  setBgVolume());

effectSlider.setAttribute('id','slider-effects');
effectSlider.classList.add('config-slider');
effectSlider.setAttribute('type','range');
effectSlider.setAttribute('value','10');
effectSlider.setAttribute('min', '0');
effectSlider.setAttribute('max','100');
effectSlider.addEventListener('input', () => setEffectVolume());


//#endregion




//#region ------------ audio config toggle buttons --------

function divToggle(e){
    if (!e.target.dataset.clicked){

        e.target.setAttribute('data-clicked', 'true');

        appendWich(e);

    } else {

        e.target.removeAttribute("data-clicked");

        unAppendWich(e);
    }
}

function appendWich(e){
    if (e.target.dataset.span == 'settings'){

        rightDiv.appendChild(settings);


    } else if (e.target.dataset.span == 'info'){

        leftDiv.appendChild(info);
    }

}

function unAppendWich(e){
    if (e.target.dataset.span == 'settings'){

        rightDiv.removeChild(settings);

    } else if (e.target.dataset.span == 'info'){
        leftDiv.removeChild(info);
    }
}

settingsBtn.addEventListener('click', (e) => divToggle(e));
infoBtn.addEventListener('click', (e) => divToggle(e));

//#endregion




//#region --------- audio rounds effects ------------- TODO

const audioEffect = document.querySelectorAll('.short-audio');
const audioEffectArr = Array.from(audioEffect);    // 0-lose 1-win 2 win? 6 big lose 5 tie

const effectLose = audioEffectArr[0];
const effectWin = audioEffectArr[1];
const effectTie = audioEffectArr[2];
const effectBigLose = audioEffectArr[3];
const effectBigWin = audioEffectArr[4];


//#endregion




//#region  ------------ Background Music -----------

const audioBg = document.querySelectorAll('.long-audio');
const audioBgArr = Array.from(audioBg);

const audioBtn = document.querySelector('#audio-settings-btn');


function randomTime(){
   return Math.floor(Math.random() * 1000)*12
}

function randomIndex(){
    return Math.floor(Math.random() * 13)
}


const bgMusicC = function(){ //chill random interval
    setTimeout(() => {
        let rAudio = audioBgArr[randomIndex()];
        rAudio.play();
        setTimeout(bgMusicC(), randomTime()*randomTime()) 
    }, randomTime());
}


document.addEventListener('load', bgMusicC());

//#endregion




//#region --------- audio mute toggle -----------

function audioToggle(e) {
    if (!e.target.dataset.clicked){

        e.target.setAttribute('data-clicked', 'true');
        audioMute();

        audioBtn.innerText = 'volume_off' 

    } else {

        e.target.removeAttribute("data-clicked");
        audioBtn.innerText = 'volume_up' 

        setEffectVolume();
        setBgVolume();
        


    }
}

function audioMute(){
    audioBgArr.forEach(audio => audio.volume = 0);
    audioEffectArr.forEach(audio => audio.volume = 0);
}

function setBgVolume(){
    if (audioBtn.dataset.clicked !== "true"){
    audioBgArr.forEach(audio => audio.volume = (bgSlider.value / 100)); 
    }   
}
function setEffectVolume(){
    if (audioBtn.dataset.clicked !== "true"){
    audioEffectArr.forEach(audio => audio.volume = (effectSlider.value / 100));
    } 
}

audioBtn.addEventListener('click', (e)=> audioToggle(e));


//#endregion


// set initial volume 

setBgVolume();
setEffectVolume();

//#region ----------- config div ------------

const githubLogo = document.createElement('img'); githubLogo.setAttribute('src', './assets/img/icon/github-mark.png')
const gitAnchor = document.createElement('a'); gitAnchor.setAttribute('href','https://github.com/carafelix/rps-sansukumi-ken')
const wikiLogo = document.createElement('img'); wikiLogo.setAttribute('src', './assets/img/icon/wikidark.svg')
const wikiAnchor = document.createElement('a'); wikiAnchor.setAttribute('href', 'https://en.wikipedia.org/wiki/Sansukumi-ken')

wikiAnchor.appendChild(wikiLogo);;
gitAnchor.appendChild(githubLogo);
info.appendChild(gitAnchor);
info.appendChild(wikiAnchor);


darkToggleDiv.appendChild(darkToggleSpan);
darkToggleDiv.appendChild(darkToggle);


darkToggleSpan.textContent = "Display Mode:"
settings.appendChild(darkToggleDiv);

bgsliderDiv.innerText = "Background Volume:"
bgsliderDiv.appendChild(bgSlider);

effectSliderDiv.innerText = "Effects Volume:"
effectSliderDiv.appendChild(effectSlider);


settings.appendChild(bgsliderDiv);
settings.appendChild(effectSliderDiv);





//#endregion




//#region  ----------- darkmode toggle ---------------

function checkInitialLightMode(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function setLightMode(){
    darkToggle.innerText = 'light_mode'
}

function setDarkMode(){
    darkToggle.innerText = 'dark_mode'
    
    //aaaaaaaañadir clase dark a algunos webeos y tal y tal
}

function toggleDarkMode(){

    if (    darkToggle.innerText === 'light_mode'    ) {

        setDarkMode()

    } else  {
        setLightMode()

    }
}

checkInitialLightMode();

darkToggle.addEventListener('click', toggleDarkMode);




//#endregion



