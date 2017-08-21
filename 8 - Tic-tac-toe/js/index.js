var app = angular.module('tictactoe', []);
app.controller('appController', appController);

function appController() {
    var controller = this;
    var player1Sign = 'X';
    var player2Sign = 'O';

    var winRows = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
        ];

    activate();

    function activate() {
        /*
            1 | 2 | 3
            4 | 5 | 6
            7 | 8 | 9
        */
        controller.currentPosition = {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: '',
            9: ''
        };

        controller.isPlayer1Turn = true;
        controller.onePlayerGame = true;
        controller.gameOver = '';
        controller.play = play;

    }

    function play(pos) {
        if (controller.gameOver !== '') {
            return
        }
        if (controller.currentPosition[pos] !== '') {
            return;
        }
        controller.currentPosition[pos] = controller.isPlayer1Turn ? player1Sign : player2Sign;

        if (isGameOver()) {
            return;
        }
        controller.isPlayer1Turn = !controller.isPlayer1Turn;
        if (!controller.isPlayer1Turn && controller.onePlayerGame) {
            //delay
            selectNextCell();
            isGameOver();
            controller.isPlayer1Turn = !controller.isPlayer1Turn;
        }
    }

    function isGameOver() {

        var crosses = [];
        var noughts = [];
        _.forOwn(controller.currentPosition, (value, key) => {
            if (value === player1Sign) {
                crosses.push(key);
            } else if (value === player2Sign) {
                noughts.push(key);
            }

        });


        _.forEach(winRows, winRow => {
            var intersectWithCrosses = _.intersection(winRow, crosses);
            var intersectWithNoughts = _.intersection(winRow, noughts);

            if (intersectWithCrosses.length === 3) {
                controller.gameOver = 'Crosses won!'
                return;
            }
            if (intersectWithNoughts === 3) {
                controller.gameOver = "Noughts won!";
                return;
            }
            if (crosses.length + noughts.length === 9) {
                controller.gameOver = "Draw!";
                return;
            }
        });


    }

    function selectNextCell() {
        var crosses = [];
        var noughts = [];
        _.forOwn(controller.currentPosition, (value, key) => {
            if (value === player1Sign) {
                crosses.push(key);
            } else if (value === player2Sign) {
                noughts.push(key);
            }

        });

        _.forEach(winRows, winRow => {
            var intersectWithCrosses = _.intersection(winRow, crosses);
            var intersectWithNoughts = _.intersection(winRow, noughts);

            if (intersectWithCrosses.length === 2) {

                var third = _.difference(winRow, intersectWithCrosses);
                controller.currentPosition[third] = player2Sign;
            }
            if (intersectWithNoughts === 2) {
                var third = _.difference(winRow, intersectWithNoughts);
                controller.currentPosition[third] = player2Sign;
            }
            //or any empty cell in a row
            console.log(controller.currentPosition);
        });
    }
}
