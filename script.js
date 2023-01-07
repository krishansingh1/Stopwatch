// const start_btn = $('#start_btn');
// const timer = $("#timer");
// const lap_btn = $(".lap_btn");
// const lap_time_container = $("#lap_timer_container");
// let startTime;
// let endTime;
// let clicked = false;
// let interval;
// let time;
// let count = 1;

// function calculate() {
//     endTime = new Date().getTime();
//     let elapsedTime = endTime - startTime;
//     let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
//     let milliseconds = Math.floor((elapsedTime % (1000 * 60)) / 100);
//     time = minutes + ' : ' + seconds + ' : ' + milliseconds;
//     timer.html(time);
// }

// let Clock = {
//     startTimer: function () {
//         startTime = new Date().getTime();
//         this.interval = setInterval(calculate, 10);
//     },

//     pause: function () {
//         clearInterval(this.interval);
//         delete this.interval;
//     },

//     resume: function () {
//         if (!this.interval) {
//             this.startTimer();
//         }
//     }
// }

// function changeIcon(anchor) {
//     var icon = anchor.querySelector('i');
//     icon.classList.toggle('fa-play');
//     icon.classList.toggle('fa-pause');
// }

// start_btn.click(function () {
//     if (Clock.interval) {
//         Clock.pause();
//     } else {
//         Clock.resume();
//     }

//     lap_btn.toggleClass('change_color');
//     lap_btn.prop('disabled', false);
// });

// lap_btn.prop('disabled', true);
// lap_btn.click(function () {
//     let lap = `
//         <div id="lap">
//             <div id="lap_count">
//                 <p>${count}</p>
//                 <span>Lap</span>
//             </div>
//                 <p>${time}</p>
//         </div>
//     `
//     lap_time_container.append(lap);
//     count++;
// })

const playButton = document.getElementById('start_btn');
const resetButton = document.getElementById('reset_btn');
const lapButton = document.getElementById('lap_btn');
const clearButton = document.querySelector('.lap-clear-button');
const icon = document.getElementById('icon');
const minute = document.querySelector('.minute');
const second = document.querySelector('.sec');
const milliSecond = document.querySelector('.millisec');
const lapContainer = document.getElementById('lap_timer_container');

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
    if (!isPlay && !isReset) {
        min = setInterval(() => {
            minute.innerHTML = `${++minuteCount} : `;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCount === 60) {
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