interventionModule.dialog = function($scope, $mdDialog) {
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
            $scope.deleteIntervention(intervention);
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
            
            $scope.editIntervention(responseDialog.intervention);
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
            $scope.addIntervention(responseDialog.intervention);
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
}