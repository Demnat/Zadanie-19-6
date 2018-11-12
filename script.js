class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    
    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    print() {
        this.display.innerText = this.format(this.times);
    }   
    
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetCounter() {
        if (!this.running) {
            this.reset();
            this.print();
        }
    }

    addResult() {
        this.results.innerHTML += `<li>${this.format(this.times)}</li>`
    }

    resetResult() {
        this.results.innerHTML = '';
    }
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'),document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    stopwatch.start();
});

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', (event) => {
    event.preventDefault();
    stopwatch.stop();
});

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    stopwatch.resetCounter();
});

let addButton = document.getElementById('add');
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    stopwatch.addResult();
});

let resetListButton = document.getElementById('resetList');
resetListButton.addEventListener('click', (event) => {
    event.preventDefault();
    stopwatch.resetResult();
});