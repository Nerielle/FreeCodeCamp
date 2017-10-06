var app = angular.module('tictactoe', []);
app.controller('appController', appController);

function appController($timeout) {
    var controller = this;
    var player1Sign = '';
    var player2Sign = '';
    var xSign = 'X';
    var oSign = 'O';
    var winRows = [
            ["1", "2", "3"]
            , ["4", "5", "6"]
            , ["7", "8", "9"]
            , ["1", "4", "7"]
            , ["2", "5", "8"]
            , ["3", "6", "9"]
            , ["1", "5", "9"]
            , ["3", "5", "7"]
        ];
    activate();

    function activate() {
        controller.play = play;
        controller.start = start;
        controller.setPlayerSign = setPlayerSign;
        start();
    }

    function setPlayerSign(sign) {
        player1Sign = sign;
        player2Sign = sign === xSign ? oSign : xSign;
        controller.showSignSelection = false;
    }

    function start() {
        /*
            1 | 2 | 3
            4 | 5 | 6
            7 | 8 | 9
        */
        controller.currentPosition = {
            1: ''
            , 2: ''
            , 3: ''
            , 4: ''
            , 5: ''
            , 6: ''
            , 7: ''
            , 8: ''
            , 9: ''
        };
        controller.isPlayer1Turn = true;
        controller.onePlayerGame = true;
        controller.gameOver = '';
        controller.showSignSelection = true;
    }

    function play(pos) {
        if (player1Sign === '') {
            return;
        }
        if (controller.gameOver !== '') {
            return;
        }
        if (controller.currentPosition[pos] !== '') {
            return;
        }
        if (controller.isPlayer1Turn === false) {
            //wait for the computer
            return;
        }
        controller.currentPosition[pos] = controller.isPlayer1Turn ? player1Sign : player2Sign;
        console.log('gamer')
        checkGameOver();
        if (controller.gameOver !== '') {
            return;
        }
        controller.isPlayer1Turn = !controller.isPlayer1Turn;
        if (controller.isPlayer1Turn === false && controller.onePlayerGame) {
            $timeout(function () {
                selectNextCell();
                console.log('end', controller.currentPosition);
                checkGameOver();
                controller.isPlayer1Turn = !controller.isPlayer1Turn;
            }, 1000);
        }
    }

    function checkGameOver() {
        var player1cells = [];
        var player2cells = [];
        _.forOwn(controller.currentPosition, (value, key) => {
            if (value === player1Sign) {
                player1cells.push(key);
            }
            else if (value === player2Sign) {
                player2cells.push(key);
            }
        });
        _.each(winRows, winRow => {
            var intersectWithPlayer1Cells = _.intersection(winRow, player1cells);
            var intersectWithPlayer2Cells = _.intersection(winRow, player2cells);
            if (intersectWithPlayer1Cells.length === 3) {
                controller.gameOver = 'You won!'
                return false;
            }
            if (intersectWithPlayer2Cells.length === 3) {
                controller.gameOver = "Computer won!";
                return false;
            }
            if (player1cells.length + player2cells.length === 9) {
                controller.gameOver = "Draw!";
                return false;
            }
        });
    }

    function selectNextCell() {
        console.log('comp')
        var player1cells = [];
        var player2cells = [];
        var emptyCells = [];
        var selected = false;
        _.forOwn(controller.currentPosition, (value, key) => {
            if (value === player1Sign) {
                player1cells.push(key);
            }
            else if (value === player2Sign) {
                player2cells.push(key);
            }
            else {
                emptyCells.push(key);
            }
        });
        console.log(player1cells, player2cells, emptyCells);
        //find win row or don't give up ( computer is not 100% smart)
        _.forEach(winRows, winRow => {
            var intersectWithPlayer2Cells = _.intersection(winRow, player2cells);
            if (intersectWithPlayer2Cells.length === 2) {
                var third = _.difference(winRow, intersectWithPlayer2Cells);
                if (controller.currentPosition[third] === '') {
                    controller.currentPosition[third] = player2Sign;
                    selected = true;
                    console.log('w', third)
                }
            }
            if (selected) {
                return false;
            }
            var intersectWithPlayer1Cells = _.intersection(winRow, player1cells);
            if (intersectWithPlayer1Cells.length === 2) {
                var third = _.difference(winRow, intersectWithPlayer1Cells);
                if (controller.currentPosition[third] === '') {
                    controller.currentPosition[third] = player2Sign;
                    selected = true;
                    console.log('g', third)
                }
            }
        });
        if (selected) {
            return;
        }
        //mark any empty cell
        if (selected === false) {
            var randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            console.log(randomEmptyCell);
            controller.currentPosition[randomEmptyCell] = player2Sign;
        }
    }
}