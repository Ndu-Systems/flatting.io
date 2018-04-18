app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
         .when('/', {
             templateUrl: 'pages/account/login.html',
             controller: 'loginController'
        })
        .when('/home', {
            title:'Home',
            templateUrl: 'pages/common/incidents.html',
          
        })
});
