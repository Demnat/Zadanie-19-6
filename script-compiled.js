'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display, results) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(times.minutes) + ':' + this.pad0(times.seconds) + ':' + this.pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'calculate',
        value: function calculate() {
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
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'resetCounter',
        value: function resetCounter() {
            if (!this.running) {
                this.reset();
                this.print();
            }
        }
    }, {
        key: 'addResult',
        value: function addResult() {
            this.results.innerHTML += '<li>' + this.format(this.times) + '</li>';
        }
    }, {
        key: 'resetResult',
        value: function resetResult() {
            this.results.innerHTML = '';
        }
    }]);

    return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', function (event) {
    event.preventDefault();
    stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function (event) {
    event.preventDefault();
    stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function (event) {
    event.preventDefault();
    stopwatch.resetCounter();
});

var addButton = document.getElementById('add');
addButton.addEventListener('click', function (event) {
    event.preventDefault();
    stopwatch.addResult();
});

var resetListButton = document.getElementById('resetList');
resetListButton.addEventListener('click', function (event) {
    event.preventDefault();
    stopwatch.resetResult();
});
