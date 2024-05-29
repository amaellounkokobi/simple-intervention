
interventionModule.model = function($scope, $http) {
    /**
     *  
     * API Calls Function
     * 
     */

    /* List all interventions */
    $http.get("http://localhost:5001/api/interventions/")
        .then(function (response) {
            $scope.interventions = response.data.interventions[0];
        }, function (error) {
            console.error('Error fetching intervention data');
        });

    /* Delete an Intervention */
    $scope.deleteIntervention = function (intervention) {
        $http.delete("http://localhost:5001/api/intervention/" + intervention.id)
            .then(function (response) {
                let removedIntervention = $scope.interventions.indexOf(intervention);
                $scope.interventions.splice(removedIntervention, 1);
            }, function (error) {
                console.error('Error deteleting intervention data');
            });
    }

    /* Delete an Intervention */
    $scope.addIntervention =  function (intervention) {
        let data = $scope.updateStatus(intervention);
        $http.post("http://localhost:5001/api/interventions/", data)
            .then(function (response) {
                $scope.interventions.push(response.data[0]);
            }, function (error) {
                console.error('Error adding intervention data');
            });
    }

    /* Edit an Intervention */
    $scope.editIntervention = function (intervention) {
        let data = $scope.updateStatus(intervention);
        $http.put("http://localhost:5001/api/intervention/" + intervention.id, data)
            .then(function (response) {
                let removedIntervention = $scope.interventions.indexOf(intervention);
                $scope.interventions.splice(removedIntervention, 1);
                $scope.interventions.splice(removedIntervention, 0, response.data[0]);
            }, function (error) {
                console.error('Error editing intervention data');
            });
    }
}