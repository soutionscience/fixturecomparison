(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")


  	$scope.dataset =[];
    $scope.teams =[];
   
   

     this.$onInit = function(){
       $scope.competionID = '444'
     	dataService.getLeagues().then(function(result){
     		$scope.dataset = result.data;
        console.log($scope.competionID)
     	

     	});
          dataService.getTeams($scope.competionID).then(function(result){
        $scope.teams = result.data;
       

      });

     	console.log($scope.dataset)
      console.log($scope.teams)
     }

  }

})();