// console.log("StopWatch");
const start_btn = $('#start_btn');
const timer = $("#timer");
const resetButton = $("#reset_btn");

let startTime;
let endTime;
let clicked = false;
let interval;
let time;
let btnClass = $("#icon_class");

function startTimer() {
    startTime = new Date().getTime();
    interval = setInterval(calculate, 10);
}

function calculate() {
    endTime = new Date().getTime();
    let elapsedTime = endTime - startTime;
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % (1000 * 60)) / 100);
    time = minutes + ':' + seconds + '.' + milliseconds;
    timer.html(time);
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

start_btn.click(function () {
    if (clicked) {
        $(this).off('click');
        clearInterval(interval);
        clicked = false;
    } else {
        startTimer();
        clicked = true;
    }

    if (btnClass.attr('class') == "fa-play") {
        resetButton.prop('disabled', true);
    }
});

resetButton.click(function () {
    reset();
});