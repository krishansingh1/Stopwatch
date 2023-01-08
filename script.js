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

const changeIcon = () => {
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
}

const toggleButton = () => {
    lapButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

const Play = () => {
    changeIcon();
    clockDot.classList.add('clock_dot');
    if (!isPlay && !isReset) {
        min = setInterval(() => {
            minute.innerHTML = `${++minuteCount} : `;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCount === 59) {
                secCount = 0;
            }
            second.innerHTML = `&nbsp;${++secCount} : `;
        }, 1000);
        milliSec = setInterval(() => {
            if (milliSecCount === 100) {
                milliSecCount = 0;
            }
            milliSecond.innerHTML = `&nbsp;${++milliSecCount}`;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        clearInterval(min);
        clearInterval(sec);
        clearInterval(milliSec);
        clockDot.classList.remove('clock_dot');
        isPlay = false;
        isReset = false;
    }
    toggleButton();
}

const Reset = () => {
    isReset = true;
    Play();
    minuteCount = 0;
    secCount = 0;
    milliSecCount = 0;
    lapButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    minute.innerHTML = "0 : ";
    second.innerHTML = "&nbsp;0 : ";
    milliSecond.innerHTML = "&nbsp;0";

}

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

const clearAll = () => {
    lapContainer.innerHTML = ``;
}

playButton.addEventListener('click', Play);
resetButton.addEventListener('click', Reset);
lapButton.addEventListener('click', lap);
clearButton.addEventListener('click', clearAll);