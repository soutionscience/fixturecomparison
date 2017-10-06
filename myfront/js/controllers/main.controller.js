(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")

    $scope.selected = "mine"
  	
   
   

     this.$onInit = function(){

       $scope.dataset =[];
     $scope.teams =[];
     dataService.getLeagues().then(function(result){
     $scope.dataset = result.data;
     console.log($scope.dataset)
     $scope.selected =  $scope.dataset[1].caption;
      });
          
      this.selectedLg= function(league){
       dataService.getTeams(league).then(function(result){
        $scope.teams = result.data.teams;
        // console.log($scope.teams)
       

      });

       this.selectedTm = function(team){
        console.log(team)
        dataService.getFixtures(team).then(function(result){
          $scope.fixtures= result.data
          console.log($scope.fixtures.fixtures[0].awayTeamName)
        })
       }
     
      
     }
    
     }
     
     

  }

})();