// variables declaration to access dom
const playButton = document.getElementById('start_btn');
const resetButton = document.getElementById('reset_btn');
const lapButton = document.getElementById('lap_btn');
const clearButton = document.querySelector('.lap-clear-button');
const icon = document.getElementById('icon');
const minute = document.querySelector('.minute');
const second = document.querySelector('.sec');
const milliSecond = document.querySelector('.millisec');
const lapContainer = document.getElementById('lap_timer_container');
const clockDot = document.getElementById('clock_dot');

//global scopre variables declarations to add functionality
let isPlay = false;
let isReset = false;
let sec;
let secCount = 0;
let min;
let minuteCount = 0;
let milliSec;
let milliSecCount = 0;
let lapCount = 0;
let lapContent;

//function to change play pause icon
const changeIcon = () => {
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
}

//function to hide and show reset and lap button
const toggleButton = () => {
    lapButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

//function to start the stopwatch
const Play = () => {
    changeIcon();
    //clock_dot class added to rotate the dot around clock
    clockDot.classList.add('clock_dot');
    //if play button pressed setting the min,sec,millisec
    if (!isPlay && !isReset) {
        //minute interval
        min = setInterval(() => {
            minute.innerHTML = `${++minuteCount} : `;
        }, 60 * 1000);
        //seconds interval
        sec = setInterval(() => {
            if (secCount === 59) {
                secCount = 0;
            }
            second.innerHTML = `&nbsp;${++secCount} : `;
        }, 1000);
        //millisecond interval
        milliSec = setInterval(() => {
            if (milliSecCount === 100) {
                milliSecCount = 0;
            }
            milliSecond.innerHTML = `&nbsp;${++milliSecCount}`;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        //if stopwatch stopped clearing the interval
        clearInterval(min);
        clearInterval(sec);
        clearInterval(milliSec);
        clockDot.classList.remove('clock_dot');
        isPlay = false;
        isReset = false;
    }
    toggleButton();
}

//reset function to reset the clock
const Reset = () => {
    isReset = true;
    Play();
    //resetting the min,sec,millisec to 0 if rest button pressed
    minuteCount = 0;
    secCount = 0;
    milliSecCount = 0;
    //hidden the buttons again
    lapButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    //making the min,sec,millisec html to rest to zero 
    minute.innerHTML = "0 : ";
    second.innerHTML = "&nbsp;0 : ";
    milliSecond.innerHTML = "&nbsp;0";

}

//lap function to add the laps while clicking the lap button
const lap = () => {
    const time = `${minuteCount} : ${secCount} : ${milliSecCount}`;
    lapContent = document.createElement('div');
    lapContent.setAttribute('id', 'lap');
    lapContent.innerHTML = `
            <div id="lap_count">
                <p>${++lapCount}</p>
                <span>Lap</span>
            </div>
                <p>${time}</p>
        </div>
    `;
    lapContainer.append(lapContent);
};

//function to clear all laps together
const clearAll = () => {
    lapCount = 0;
    lapContainer.innerHTML = ``;
}

//event listeners to play,reset,lap,clear buttons
playButton.addEventListener('click', Play);
resetButton.addEventListener('click', Reset);
lapButton.addEventListener('click', lap);
clearButton.addEventListener('click', clearAll);