(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")

    $scope.selected = "mine"
    var fixtureLimit =5
  	
    this.$onInit = function(){

         // Away team
     this.initiateAway= function(){
      console.log("Away initiated")
     }     


      // home team

       $scope.dataset =[];
     $scope.teams =[];
      $scope.fixtures=[];
     dataService.getLeagues().then(function(result){
     $scope.dataset = result.data;
     $scope.awayDataset= result.data
     console.log($scope.dataset)
     $scope.selected =  $scope.dataset[1].caption;
      });
          
      this.selectedLg= function(league){
      dataService.getTeams(league).then(function(result){
        $scope.teams = result.data.teams;
        // console.log($scope.teams)
      });
 }
       //set league for away team
       this.selectedAwLg= function(league){
      dataService.getTeams(league).then(function(result){
        $scope.Awteams = result.data.teams;
        // console.log($scope.teams)
      });
 }
       //set fixtures for home team
       this.selectedTm = function(team){
        $scope.limit = fixtureLimit
    
        dataService.getFixtures(team).then(function(result){
          $scope.fixtures= result.data.fixtures
          console.log($scope.fixtures)
        
        })
         
      }
     //set fixtures for way team

           this.selectedAwTm = function(team){
        $scope.limit = fixtureLimit
        
        dataService.getFixtures(team).then(function(result){
          $scope.fixturesAw= result.data.fixtures
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