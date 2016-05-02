'use strict';
angular.module('myApp',[])
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
        $scope.goToProjectDetails = function (project) {
            //open github repository in new tab
            console.log('details for ' + project.name);
        }
    });

