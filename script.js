// console.log("StopWatch");
const start_btn = document.getElementById('start_btn');

let minute = 0;
let second = 0;
let millisecond = 0;


start_btn.addEventListener('click', (e) => {
    e.preventDefault();
    startTime(minute, second, millisecond)
});

function startTime(min, sec, m_sec) {
    let interval = setInterval(() => {
        m_sec = m_sec + 1;
        if (m_sec == 230) {
            m_sec = 0;
            sec = sec + 1;
            if (sec == 60) {
                sec = 0;
                min = min + 1;
            }
        }
        console.log(`seconds:${sec},minute:${min}`);
    }, 1);
}

function changeIcon(anchor) {
    var icon = anchor.querySelector('i');
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');

}