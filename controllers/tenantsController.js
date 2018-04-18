app.controller('getTenantsController', function ($http, $scope, $window, $timeout, $location) {

    $scope.GetAllTenants = function () {
        $http.get(GetApiUrl("GetAllTenants")).success(function (response, status) {
            if (response.data !== undefined) {
                $scope.tenants = response.data;
            }
        })
    }

    //Call the function(s) here
    $scope.GetAllTenants();
});

app.controller('addTenantController', function ($http, $scope, $window, $timeout, $location) {
    $scope.message = undefined;
    $scope.AddTenant = function () {

        $scope.message = undefined;

        var data = {
            FirstName: $scope.FirstName,
            Surname: $scope.Surname,
            Email: $scope.Email,
            ContactNumber: $scope.ContactNumber,
            NOKName: $scope.NOKName,
            NOKNumber: $scope.NOKNumber,
            WorkAddress: $scope.WorkAddress,
            WorkTelephone: $scope.WorkTelephone,
            WorkName: $scope.WorkName
        };

        if (data.FirstName === undefined || data.FirstName === "") {
            $scope.message = "First Name is a Required Field.";
        }
        else {
            $http.post(GetApiUrl("AddTenant"), data)
                .success(function (response, status) {
                    if (parseFloat(response) === 1) {
                        $window.location.href = "#tenants";
                        $scope.message = undefined;
                    }
                    else {
                        $scope.message = "Something went wrong, Contact System Administrator";
                    }
                });
        }
    } 
});

app.controller('editTenantsController', function ($http, $scope, $window, $timeout, $location) {


});