const start_btn = $('#start_btn');
const timer = $("#timer");
const resetButton = $("#reset_btn");

let startTime;
let endTime;
let clicked = false;
let interval;
let time;
let modify_btn = $("#icon_class");

function calculate() {
    endTime = new Date().getTime();
    let elapsedTime = endTime - startTime;
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % (1000 * 60)) / 100);
    time = minutes + ' : ' + seconds + ' : ' + milliseconds;
    timer.html(time);
}

let Clock = {

    startTimer: function () {
        startTime = new Date().getTime();
        this.interval = setInterval(calculate, 10);
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    resume: function () {
        if (!this.interval) {
            this.startTimer();
        }
    }
}

function changeIcon(anchor) {
    var icon = anchor.querySelector('i');
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
}

function reset() {
    time = "0:0:0";
    timer.html(time);
}

// Clock.startTimer();

start_btn.click(function () {
    if (Clock.interval) {
        Clock.pause();
        console.log(time);
    } else {
        Clock.resume();
    }

    resetButton.toggleClass('change_color');
});

resetButton.click(function () {
    reset();
});