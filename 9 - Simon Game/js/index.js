var app = angular.module('simon', []);
app.controller('MainController', MainController);

function MainController() {
    var controller = this;
    controller.click = click;

    function click(btn) {
        console.log(btn);
    }
}