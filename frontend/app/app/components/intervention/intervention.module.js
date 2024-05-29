/**
 * 
 * This module is the intervention controller
 * dependencies:
 * 
 *  $scope
 *  $http
 *  $mdDialog
 * 
 */
interventionModule = angular.module('interventionModule', [])

interventionModule.controller('InterventionController', ['$scope', '$http', '$mdDialog', function ($scope, $http, $mdDialog,) {
     /**
     *  
     *  Variable declaration
     * 
     */
    $scope.order = '-date_crea';

    /**
     *  
     *  Intervention logic functions
     * 
     */
    
    /* Return the tag to order the list of interventions */
    $scope.orderList = function () {
        $scope.order == '-date_crea' ? $scope.order = 'date_crea' : $scope.order = "-date_crea";
    };

    /* Manage status of an intervention */
    $scope.updateStatus = function (intervention) {

        // Define status validate = 1 
        for (const key in intervention) {
            if (intervention[key] !== undefined || intervention[key] !== null) {
                if (intervention[key] == ""){
                    intervention.status = 0;
                    break;
                } else {
                    intervention.status = 1;
                }
            } else {
                intervention.status = 0;
                break;
            }
        }

        // Define status finish = 2
        if( intervention !== undefined)
            if(intervention.status !== 0)
                if ($scope.interventionFinishStatus(intervention) == 2)
                    intervention.status = 2;

        return (intervention);
    }

    /* Manage the finish state of an intervention */
    $scope.interventionFinishStatus = function (intervention) {
            let date_intervention = new Date(intervention.date_end).getTime();
            let date_now = Date.now()

            // Compare the dates and return the correct  status
            if (date_intervention != 0) {
                if (date_now > date_intervention) {
                    return (2);
                } else {
                    return (intervention.status);
                }
            } else {
                return (0);
            }
    }

    interventionModule.model($scope, $http);
    interventionModule.dialog($scope,$mdDialog);
}]);








