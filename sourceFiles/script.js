const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();
console.log("Number: ", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();


//start recognition 
recognition.start();

//user input
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

//outputs what user inputs
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div class="youSaid">You said: </div>
        <span class="box">${msg}</span>
    `;
}

//check msg
function checkNumber(msg) {
    const num = +msg;
    
    //if its valid or not
    if(Number.isNaN(num)) {
        msgEl.innerHTML += `
            <div class="furtherIns"><b>That's not a valid number!</b></div>
        `;
        return;
    }

    //if it is in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += `
            <div class="furtherIns"><b>Number must be between 1 and 100!</b></div>
        `;
        return;
    } 

    //check number
    if(num == randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! you have guessed it right! <br><br>
            It was ${num}. Hurreh! 🤩</h2> 
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += `
            <div class="furtherIns"><b>Go Lower!</b></div>
        `;
    } else {
        msgEl.innerHTML += `
        <div class="furtherIns"><b>Go Higher!</b></div>
    `; 
    }
}

// generates random number
function getRandomNumber() {
    return Math.floor(Math.random()*100) + 1;
}

//speek result
recognition.addEventListener("result", onSpeak);

//end SR
recognition.addEventListener("end", () => recognition.start());

//reload
document.body.addEventListener("click", e => {
    if(e.target.id == "play-again") {
        window.location.reload();
    }
})