(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")


  	
   
   

     this.$onInit = function(){
       $scope.dataset =[];
     $scope.teams =[];
     
     	dataService.getLeagues().then(function(result){
      
     		$scope.dataset = result.data;
      
             	

     	});
          
      this.selectedLg= function(league){
   
     
     
       dataService.getTeams(league).then(function(result){
        $scope.teams = result.data.teams;
        // console.log($scope.teams)
       

      });
     
      
     }
    
     }
     
     

  }

})();