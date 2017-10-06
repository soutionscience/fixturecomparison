(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")

    $scope.selected = "mine"
    var fixtureLimit =5
  	
   
   

     this.$onInit = function(){

       $scope.dataset =[];
     $scope.teams =[];
      $scope.fixtures=[];
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
 }
       this.selectedTm = function(team){
        $scope.limit = fixtureLimit
        console.log(team)
        dataService.getFixtures(team).then(function(result){
          $scope.fixtures= result.data.fixtures
          console.log($scope.fixtures)
        })
       }

         $scope.addLimit= function(){
        $scope.limit= fixtureLimit + fixtureLimit
        console.log("Added scope limit to :" + $scope.limit)
       }
     
     
      
    
    
     }
     
     

  }

})();