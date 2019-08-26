(function(window, angular){
    'use strict';
    var myApp = angular.module('myApp', [ 'ngRoute' , 'ngResource']);
    myApp.controller('myController', myController);

    function myController($scope, $window, $http)
    {
        const costEmployee = 1000;
        const costDependent = 500;
        const discount = .10;
        const discountName = "A";
        const amountPerPaycheck = 2000;
        const numberPaychecks = 26;

        $scope.employees = [];
        $scope.disableEmployeeAdd = false;
        $scope.disableDependentAdd = true;
        $scope.validName = false;
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.employee = '';
        $scope.is_employee = '';
        $scope.cost = 0;
        $scope.total = 0;
        $scope.yearlyRemaining = numberPaychecks*amountPerPaycheck;


        //Add Employee
        $scope.addEmployee = function () {
            $scope.checkNames();
            if($scope.validName) {
                $scope.basePrice = costEmployee;
                $scope.getCost();

                let employee = {
                    id: $scope.employees.length + 1,
                    employee_name: $scope.firstName + " " + $scope.lastName,
                    is_employee: "Employee",
                    cost: $scope.cost.toFixed(2)
                };

                $scope.employees.push(employee);
                $scope.disableEmployeeAdd = true;
                $scope.disableDependentAdd = false;
                $scope.updateTotal();
            }
            $scope.resetScope();
        }

        //Add Dependent
        $scope.addDependent = function () {
            $scope.checkNames();
            if($scope.validName) {
                $scope.basePrice = costDependent;
                $scope.getCost();

                let dependent = {
                    id: $scope.employees.length + 1,
                    employee_name: $scope.firstName + " " + $scope.lastName,
                    is_employee: "Dependent",
                    cost: $scope.cost.toFixed(2)
                };

                $scope.employees.push(dependent);
                $scope.updateTotal();
            }
            $scope.resetScope();
        }

        //Remove Employee or Dependent
        $scope.removeRow = function (index) {
            //Find the record using Index from Array.
            let name = $scope.employees[index].employee_name;
            let type = $scope.employees[index].is_employee;
            if ($window.confirm("Do you want to delete: " + name)) {
                if(type == "Employee")
                {
                    $scope.disableEmployeeAdd = false;
                    $scope.disableDependentAdd = true;
                }
                //Remove the item from Array using Index.
                $scope.employees.splice(index, 1);
            }
            $scope.updateTotal();
        }

        //Updates the total cost preview
        $scope.updateTotal = function () {
            $scope.total = $scope.employees.reduce( ( total, {cost} ) => total + parseFloat(cost), 0);
            $scope.costPerPaycheck = ($scope.total/numberPaychecks).toFixed(2);
            $scope.yearlyRemaining = numberPaychecks*amountPerPaycheck - $scope.total;
            $scope.yearlyRemaining = $scope.yearlyRemaining.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
            $scope.costPerPaycheck = $scope.costPerPaycheck.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
            $scope.total = $scope.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        }

        //Get cost of current person
        $scope.getCost = function ()
        {
            let name = $scope.firstName.toUpperCase();
            if(name.startsWith(discountName))
            {
                $scope.cost = $scope.basePrice - ($scope.basePrice * discount);
            }
            else
            {
                $scope.cost = $scope.basePrice;
            }
        }

        //Make sure that there is content in the first and last name fields
        $scope.checkNames = function()
        {
            if(!$scope.firstName && !$scope.lastName)
            {
                alert("First and last name required.");
            }
            else if(!$scope.firstName)
            {
                alert("First name required.");

            }
            else if(!$scope.lastName)
            {
                alert("Last name required.");
            }
            else
            {
                $scope.validName = true;
            }
        }

        //Reset the scope in this context
        $scope.resetScope = function()
        {
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.employee = '';
            $scope.is_employee = '';
            $scope.cost = 0;
            $scope.validName = false;
        }

        //Resetting the entire application
        $scope.resetApplication = function()
        {
            for(let i = 0; i < $scope.employees.length; i ++)
            {
                $scope.employees.splice(i, 1);
            }
            $scope.validName = false;
            $scope.disableEmployeeAdd = false;
            $scope.disableDependentAdd = true;
            $scope.validName = false;
            $scope.employees = [];
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.employee = '';
            $scope.is_employee = '';
            $scope.cost = 0;
            $scope.total = 0;
            $scope.yearlyRemaining = 0;
            $scope.costPerPaycheck = 0;
        }
    }
})(window, window.angular);