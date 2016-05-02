'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute'
    // 'myApp.view1',
    // 'myApp.view2',
]);
// ]);.config(['$routeProvider', function ($routeProvider) {
//     $routeProvider.otherwise({redirectTo: '/view1'});
// }]);

angular.module('myApp')
    .controller('appController', function ($scope) {
        $scope.projects = [
            {
                name: "Some nice project",
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                imgSrc: "http://www.freeimageslive.com/galleries/backdrops/fractal/pics/fractal_overlap_curves.jpg"
            },
            {
                name: "Project 2",
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                imgSrc: "http://www.freeimageslive.com/galleries/backdrops/fractal/pics/fractal_highlights_blue.jpg"
            },
            {
                name: "Project 3",
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                imgSrc: "http://www.freeimageslive.com/galleries/backdrops/fractal/pics/fractal_cubes_cyan.jpg"
            }
        ];
    });

