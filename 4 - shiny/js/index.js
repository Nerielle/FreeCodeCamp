  var app = angular.module('weatherApp',[]);
  app.service('weatherService', function($http, $q){
    var service = this;        
    service.defer=$q.defer();
    getWeather();    
    function getWeather(){ 
      getLocation(function(location){         
        var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q="+ location.data.city +"&APPID=83b9885aa4d20b7d6e5a9149941cee9b"
        +"&units=imperial";        
        $http.get(weatherApi)
         .then(function(response){            
            service.weather=response.data;
            service.defer.resolve();            
        })      
           
  });    
  }
  function getLocation(callback) {
    $http.get("http://ip-api.com/json")  
    .then(function(location){      
      callback(location);
    });
    }
  return service;
  });
 app.controller('weatherCtrl', function($scope, weatherService){     
   var isFarenheit = true;
   var controller = this;
  var icons = {    // Daytime conditions
                  '01d': 'wi-day-sunny',
                  '02d': 'wi-day-sunny-overcast',
                  '03d': 'wi-day-cloudy',
                  '04d': 'wi-cloudy',
                  '09d': 'wi-day-sprinkle',
                  '10d': 'wi-day-rain',
                  '11d': 'wi-day-thunderstorm',
                  '13d': 'wi-day-snow',
                  '50d': 'wi-day-fog',

                  // Nightime conditions
                  '01n': 'wi-stars',
                  '02n': 'wi-night-partly-cloudy',
                  '03n': 'wi-cloudy',
                  '04n': 'wi-night-cloudy',
                  '09n': 'wi-night-sprinkle',
                  '10n': 'wi-night-rain',
                  '11n': 'wi-night-thunderstorm',
                  '13n': 'wi-night-snow',
                  '50n': 'wi-night-fog'
        }
      weatherService.defer
        .promise.then(function(){        
        $scope.weather = weatherService.weather;
        $scope.main = $scope.weather.weather[0].main;
        $scope.temp = { value: Math.round($scope.weather.main.temp), deg:"wi-fahrenheit"};        
        $scope.icon = icons[$scope.weather.weather[0].icon];              
      });    
$scope.convert = convert;   
 function convert(){  
   if($scope.temp === undefined){
     return;
   }   
   var currentVal = $scope.temp.value;   
   if(isFarenheit){     
     $scope.temp.value = Math.round((currentVal - 32)*5/9);
     $scope.temp.deg = "wi-celsius";
     isFarenheit = false;
   }else{
      $scope.temp.value = Math.round(currentVal *9/5 + 32);
      $scope.temp.deg = "wi-fahrenheit";
      isFarenheit = true;
   }
 }    
  });