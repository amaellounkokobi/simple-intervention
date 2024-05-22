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
        for (const key in intervention) {
            console.log("initial status", intervention.id ,intervention.status)
            if (intervention[key] !== undefined || intervention[key] !== null) {
                intervention.status = 1;
            } else {
                intervention.status = 0;
                break;
            }
        }

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

    /**
     *  
     *  Calls mdDialog Functions
     * 
     */

    /* This Dialog is responsible for removing an intervention */
    $scope.removeInterventionDialog = function (ev, intervention) {
        let confirm = $mdDialog.confirm()
            .title("Supprimer l'intervention " + intervention.title)
            .textContent('Êtes-vous sûr de vouloir supprimer cette intervention ?')
            .ariaLabel('Suppression')
            .targetEvent(ev)
            .ok('oui')
            .cancel('non');
        $mdDialog.show(confirm).then(function () {
            deleteIntervention(intervention);
        }, function () { });
    };

    /* This Dialog is responsible for editing an intervention */
    $scope.editInterventionDialog = function (ev, intervention) {
        $scope.editintervention = intervention

        $mdDialog.show({
            locals: { intervention: $scope.editintervention },
            controller: editDialogController,
            templateUrl: 'app/templates/edit_intervention.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
        }).then(function (responseDialog) {
            editIntervention(responseDialog.intervention);
        }, function () { });
    };

    /* This Dialog is responsible for Adding an intervention */
    $scope.addInterventionDialog = function (ev) {
        $mdDialog.show({
            locals: { intervention: $scope.intervention },
            controller: addDialogController,
            templateUrl: 'app/templates/new_intervention.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
        }).then(function (responseDialog) {
            addIntervetion(responseDialog.intervention);
        }, function () { });
    };

    /* Edit Intervention dialog controls implementation */
    function editDialogController($scope, $mdDialog, intervention) {
        $scope.intervention = intervention
        if($scope.intervention === undefined){
            $scope.intervention = {
                'id' : intervention.id,
                'title': null,
                'description': null,
                'date_start': null,
                'date_end': null,
                'collaborator': null,
                'location': null
            };
        }
        $scope.hide = function () { $mdDialog.hide({}); };
        $scope.cancel = function () { $mdDialog.cancel({}); };
        $scope.answer = function (intervention) {
            $mdDialog.hide({
                intervention: intervention
            });
        };
    }

    /* Add Intervention dialog controls implementation */
    function addDialogController($scope, $mdDialog) {
        $scope.intervention = {
            'title': null,
            'description': null,
            'date_start': null,
            'date_end': null,
            'collaborator': null,
            'location': null
        };
        $scope.hide = function () { $mdDialog.hide({}); };
        $scope.cancel = function () { $mdDialog.cancel({}); };
        $scope.answer = function (newintervention) {
            $mdDialog.hide({
                intervention: newintervention,
            });
        };
    }

    /**
     *  
     * API Calls Function
     * 
     */

    /* List all interventions */
    $http.get("http://localhost:5000/api/interventions/")
        .then(function (response) {
            $scope.interventions = response.data.interventions[0];
            console.log('les interventions:', $scope.interventions)

        }, function (error) {
            console.error('Error fetching intervention data');
        });

    /* Delete an Intervention */
    function deleteIntervention(intervention) {
        $http.delete("http://localhost:5000/api/intervention/" + intervention.id)
            .then(function (response) {
                let removedIntervention = $scope.interventions.indexOf(intervention);
                $scope.interventions.splice(removedIntervention, 1);
            }, function (error) {
                console.error('Error deteleting intervention data');
            });
    }

    /* Delete an Intervention */
    function addIntervetion(intervetion) {
        let data = $scope.updateStatus(intervetion);
        $http.post("http://localhost:5000/api/interventions/", data)
            .then(function (response) {
                $scope.interventions.push(response.data[0]);
            }, function (error) {
                console.error('Error adding intervention data');
            });
    }

    /* Edit an Intervention */
    function editIntervention(intervention) {
        let data = $scope.updateStatus(intervention);
        $http.put("http://localhost:5000/api/intervention/" + intervention.id, data)
            .then(function (response) {
                let removedIntervention = $scope.interventions.indexOf(intervention);
                $scope.interventions.splice(removedIntervention, 1);
                $scope.interventions.splice(removedIntervention, 0, response.data[0]);
            }, function (error) {
                console.error('Error editing intervention data');
            });
    }

}]);








