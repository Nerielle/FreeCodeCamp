const projectName = "javascript-calculator";
var app = angular.module('calc', []);
app.controller('calcController', calcController);

function calcController($scope) {
    var controller = this;
    controller.value = "0";
    controller.recent = '';
    controller.recentOperation = [];
    controller.minus = minus;
    controller.plus = plus;
    controller.divide = divide;
    controller.multiply = multiply;
    controller.clear = clear;
    controller.equals = equals;
    controller.number = number;
    controller.addSign = addSign;
    controller.dot = dot;
    const operations = {
        plus: '+',
        minus: '-',
        multiplication: '*',
        division: '/',
        sign: 'sign',
        clear: 'clear',
        equal: '=',
        dot: '.'
    };
    var binOperators = [operations.plus, operations.minus, operations.multiplication, operations.division];


    $scope.$watchCollection(() => controller.recentOperation, (prev, curr) => {

        controller.recent = controller.recentOperation.reduce((prev, curr) => {
            if (curr.length !== 1 && curr.startsWith("-")) {
                prev += " (" + curr + ")";
            } else {
                prev += " " + curr;
            }
            return prev;

        }, "");
    });

    function addSign() {
        if (binaryOperationIsLast()) {
            return;
        }
        if (controller.value.startsWith("-")) {
            controller.value = controller.value.slice(1, controller.value.length);
        } else {
            controller.value = "-" + controller.value;
        }
        updateLastNumber();
    }

    function binaryOperationIsLast() {
        var xx = binOperators.find(x => x === getLastOperation());
        //console.log(xx)
        return xx !== undefined;
    }

    function number(number) {
        var num = number.toString();
        var lastBtnIsOperator = binaryOperationIsLast();
        if (controller.value === "0" || lastBtnIsOperator) {
            controller.value = num;
            controller.recentOperation.push(num);
            console.log(controller.recentOperation);
        } else {

            controller.value = controller.value + num;
            updateLastNumber();
            console.log(controller.recentOperation);
        }

    }

    function clear() {
        controller.value = "0";
        controller.recent = '';
        controller.recentOperation = [];
    }

    function equals() {
        if (controller.recentOperation.length === 0) {
            return;
        }

        var result = parseFloat(controller.recentOperation[0]);
        for (var i = 1; i < controller.recentOperation.length; i += 2) {
            var secondParam = controller.recentOperation.length - i == 1 ?
                result :
                parseFloat(controller.recentOperation[i + 1]);
            switch (controller.recentOperation[i]) {
                case operations.division:
                    {                        
                        result = result / secondParam;
                        break;
                    }
                case operations.minus:
                    {
                        result = result - secondParam;
                        break;
                    }
                case operations.multiplication:
                    {
                        result = result * secondParam;
                        break;
                    }
                case operations.plus:
                    {
                        result = result + secondParam;
                        break;
                    }
                default:
                    {
                        throw Error("Unknown operation");
                    }
            }
        }
        controller.value = result.toString();

    }

    function dot() {
        if (binaryOperationIsLast() || controller.value.indexOf('.')!= -1) {
            return;
        }
        controller.value += '.';

        updateLastNumber();
    }

    function multiply() {
        if (binaryOperationIsLast() || controller.recentOperation.length === 0) {
            return;
        }
        controller.recentOperation.push(operations.multiplication);
    }

    function divide() {
        if (binaryOperationIsLast() || controller.recentOperation.length === 0) {
            return;
        }
        controller.recentOperation.push(operations.division);
    }

    function plus() {
        if (binaryOperationIsLast() || controller.recentOperation.length === 0) {
            return;
        }
        controller.recentOperation.push(operations.plus);
    }

    function minus() {
        if (binaryOperationIsLast() || controller.recentOperation.length === 0) {
            return;
        }
        controller.recentOperation.push(operations.minus);
    }

    function getLastOperation() {
        return controller.recentOperation[controller.recentOperation.length - 1];
    }

    function updateLastNumber() {
        var index = controller.recentOperation.length === 0 ? 0 : controller.recentOperation.length - 1;
        controller.recentOperation[index] = controller.value;
    }
}
