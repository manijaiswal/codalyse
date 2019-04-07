var app = angular.module('app',['ngRoute','ipCookie','ui.router','ui.bootstrap','MainController','chart.js','ngFileUpload']);


app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('app',{
        url:'/',
        templateUrl:'views/home.html',
        controller:'MainController'
    })
}]);    


app.run(['$rootScope','$location','ipCookie','$state','$window','ApiFactory',function($rootScope,$location,ipCookie,$state,$window,ApiFactory){
    $rootScope.$on('$locationChangeSuccess',function(event,next,current){
 
         $rootScope.loc = $location.path();
        
        if(!ipCookie('token')){      
           if($location.path()=='/customer_login'){
             $location.path('/login');
           }
         }
         if(ipCookie('token')){           
            $rootScope.profile_data = ipCookie('profile')
            console.log($rootScope.profile_data)          
         } 
         

         console.log(ipCookie('token'));
         $rootScope.isLogged = function() {
             if(!ipCookie('token')){
                 return false;
             }
             else{
                 return true;
             }
         };
 
         $rootScope.logout1 = function() {
            ipCookie.remove('token');
            ipCookie.remove('aid');
            ipCookie.remove('role');
            $location.path('/')
         };

    })
}])

