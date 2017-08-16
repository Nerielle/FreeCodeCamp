var app = angular.module('clock', []);
app.controller('clockController', clockController);

function clockController($interval) {
    var controller = this;
    var animation;
    var breakElement;

    activate();

    function activate() {
        controller.break = 1;
        controller.work = 1;
        controller.time = secondsToHms(controller.work * 60);
        controller.isBreakTime = false;
        controller.currentSeconds = controller.work * 60;
        breakElement = $('.break');


        controller.start = start;
        controller.stop = stop;
        controller.clock = undefined;
    }

    function secondsToHms(seconds) {

        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        var r = h > 0 ? h + ':' : '' +
            (m < 10 ? '0' : '') + m +
            ':' + (s < 10 ? '0' : '') + s;

        return r;
    }

    function start() {
        controller.currentSeconds = controller.work * 60;
        controller.clock = $interval(function () {
            if (controller.currentSeconds === 0 && !controller.isBreakTime) {
                controller.isBreakTime = true;
                controller.currentSeconds = controller.break * 60;
                animation = $interval(moveItMoveIt, 4000);
                return;
            }
            if (controller.currentSeconds === 0 && controller.isBreakTime) {
                controller.isBreakTime = false;
                animation = undefined;
                controller.currentSeconds = controller.work * 60;
                return;
            }
            controller.currentSeconds -= 1;
            controller.time = secondsToHms(controller.currentSeconds);
        }, 1000);
    }

    function moveItMoveIt() {
        var left = breakElement.css('left');
        var currentVal = parseInt(left.substr(0, left.length - 2));
        var newValue = currentVal == -40 ? 40 : -40;
        breakElement.css('left', newValue + 'px');
    }

    function stop() {
        console.log('stop');
        $interval.cancel(controller.clock);
        if (animation != undefined) {
            $interval.cancel(animation);
        }
    }
}
