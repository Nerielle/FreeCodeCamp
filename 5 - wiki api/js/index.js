var module = angular.module('wikiSearch', []);
module.controller('wikiController', wikiController);

function wikiController($scope, $http) {
    var controller = this;
    var page = 'https://en.wikipedia.org/?curid=';
    $scope.results = [];
    $scope.searchStr = "";
    controller.search = search;

    function search() {
        var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + $scope.searchStr + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (data) {
            var pages = data.query.pages;
            console.log(data);
            angular.forEach(pages, function (item) {
                $scope.results.push({
                    title: item.title
                    , body: item.extract
                    , link: page + item.pageid
                })
            })
        });
    }
}