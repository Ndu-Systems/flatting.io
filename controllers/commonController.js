// Common Controller that loads all Maintenance Logs for the system
app.controller('commonController', function ($http, $scope, $window, $timeout, $location) {

    //Get All Active maintenance in the system
    $scope.GetActiveMaintenance = function () {

        $http.get(GetApiUrl("GetAllMaintenances")).success(function (response, status) {

            if (response.data !== undefined) {
                $scope.maintenance = response.data;
            }
        }) 

         

    }

    ////Check if its a local or deployed version of the configuration.
    //$scope.CheckUrl = function () {
    //    if (!isLocal) {

    //        var baseUrlMain = $location.absUrl();
    //        const BASEURLMAIN_SECURE = "https://www.flatting.io.com";
    //        var res = baseUrlMain.substring(0, 27);
    //        if (res != BASEURLMAIN_SECURE) {
    //            $window.location = BASEURLMAIN_SECURE;
    //        }
    //    }
    //}

    ////call the functions in this controller load on the body tab in the head.php
    //$scope.CheckUrl();
    $scope.GetActiveMaintenance();


});

app.controller('navController', function ($http, $scope, $window, $timeout, $location) { });