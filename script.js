const start_btn = $('#start_btn');
const timer = $("#timer");
const lap_btn = $(".lap_btn");
const lap_time_container = $("#lap_timer_container");

let startTime;
let endTime;
let clicked = false;
let interval;
let time;
let count = 1;

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

start_btn.click(function () {
    if (Clock.interval) {
        Clock.pause();
    } else {
        Clock.resume();
    }

    lap_btn.toggleClass('change_color');
    lap_btn.prop('disabled', false);
});

lap_btn.prop('disabled', true);
lap_btn.click(function () {
    let lap = `
        <div id="lap">
            <div id="lap_count">
                <p>${count}</p>
                <span>Lap</span>
            </div>
                <p>${time}</p>
        </div>
    `
    lap_time_container.append(lap);
    count++;
})