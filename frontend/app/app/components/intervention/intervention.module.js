/**
 * 
 * This module is the intervention controller
 * dependencies:
 * 
 *  $scope
 *  $http
 *  $filter
 *  $mdDialog
 * 
 */
interventionModule = angular.module('interventionModule', [])

interventionModule.controller('InterventionController', ['$scope', '$http', '$filter', '$mdDialog', function ($scope, $http, $filter, $mdDialog, ){
    
    /**
    * Variable declaration
    * @newintervention : New data for intervention
    * @editintervention : edited data for intervention
    * @order : order display tab
    */
    $scope.newintervention = {};
    $scope.editintervention = {};
    $scope.order = '-date_crea';

    /**
     *  Add an intervention
     */
    $scope.addIntervention = function(){
        // create datetime value for date end
        var dStart = $filter('date')($scope.dateStart, 'yyyy-MM-dd')
        var tStart = $filter('date')($scope.timeStart, 'HH:mm:ss')
        var date_start = dStart + ' ' + tStart
        $scope.newintervention.date_start = date_start

        // create datetime value for date end
        var dEnd = $filter('date')($scope.dateEnd, 'yyyy-MM-dd')
        var tEnd = $filter('date')($scope.timeEnd, 'HH:mm:ss')
        var date_end = dEnd + ' ' + tEnd
        $scope.newintervention.date_end = date_end

        $http.post("http://localhost:5000/api/interventions/", $scope.newintervention)
        .then(function (response) {
            console.log("Après l'ajout :",response);
            $scope.interventions.push(response)
            $mdDialog.hide();
        }, function (error) {
            console.error('Error adding intervention data');
        });

    };

    /**
     *  Combinate date time
     */
    $scope.combineDateTime = function(date, time){
        return(date + ' ' + time);  
    };

    /**
     *  Return the tag to order the list of interventions
     */
    $scope.orderList = function(){
            if ($scope.order == '-date_crea'){
                $scope.order = 'date_crea';
            } else {
                $scope.order = "-date_crea";
            }
        };

    /**
     * This method set the intervention edit form
     */
    setInterventions = function (){

        $http.get("http://localhost:5000/api/intervention/")
        .then(function (response) {

            $scope.interventions = response.data.interventions[0];

            console.log($scope.interventions)

        }, function (error) {
            console.error('Error fetching intervention data');
        });
    }

    /**
     * This method is resposible for getting intervention data
     */
    getInterventions = function (){
        $http.get("http://localhost:5000/api/interventions/")
        .then(function (response) {

            $scope.interventions = response.data.interventions[0];
            console.log("get the datas :",$scope.interventions)

        }, function (error) {
            console.error('Error fetching intervention data');
        });
    }

    /**
     * This method is resposible for getting collaborators data
     */
    getCollaborators = function (){
    $http.get("http://localhost:5000/api/collaborators/")
        .then(function (response) {

            $scope.collaborators = response.data.collaborators[0];

            console.log($scope.collaborators)

        }, function (error) {
            console.error('Error fetching collaborators data');
        });
    }

    /**
     * This method is resposible for getting locations data
     */
    getLocations = function (){
    $http.get("http://localhost:5000/api/locations/")
        .then(function (response) {

            $scope.locations = response.data.locations[0];

            console.log($scope.locations)

        }, function (error) {
            console.error('Error fetching locations data');
        });
    }

    /**
     * This method is resposible for showing a Dialog for add  an interventionn
     */
    $scope.showModal = function (ev) {
        $mdDialog.show({
          controller: this.InterventionController,
          templateUrl: 'new_intervention.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen,
        }).then(function(){
            //dirty solution
            location.reload()

            /**
             *  Adding the new intervention inside the interventions 
             *  Better solution but doesn't work as expected
             */
            //console.log($scope.newintervention)
            //$scope.interventions.push($scope.newintervention)
            //console.log($scope.interventions)
          });
      };
      
    /**
     * This method is executed while hiding the dialog
     */
    $scope.hide = function () {
        $mdDialog.hide();
      };

    /**
     * This method is executed while closing the dialog
     */
    $scope.cancel = function () {
        $mdDialog.cancel();
      };

    /**
     * This method is executed while validating the dialog
     */
    $scope.answer = function (answer) {
      };
      
      /*
      * Init Data
      */
      getInterventions();
      getCollaborators();
      getLocations();

}]);