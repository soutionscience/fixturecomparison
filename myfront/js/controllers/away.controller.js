(function(){
  angular.module('fixApp').controller('awayCtrl', awayCtrl)

  awayCtrl.$inject =['dataService', '$scope', 'awfilter']

  function awayCtrl(dataService, $scope, awfilter){
    console.log("test")

    $scope.selected = "mine"
    var fixtureLimit =5;
    $scope.class="location home"



    var hometeamData;
    
    this.$onInit = function(){
          $scope.venue=[];
         $scope.against =[]


     $scope.dataset =[];
     $scope.teams =[];
     $scope.fixtures=[];
     $scope.choosenHomeTeam =[];
     $scope.selectedteams
  
     dataService.getLeagues().then(function(result){
     $scope.dataset = result.data;
     $scope.awayDataset= result.data
     console.log($scope.dataset)
     $scope.selected =  $scope.dataset[1].caption;
      });
          
      this.selectedLg= function(league){
      dataService.getTeams(league).then(function(result){
        $scope.teams = result.data.teams;
       //console.log("can we get team "+ $scope.teams[0].name)
      });
 }

        
        this.selectedTm = function(team){
        $scope.limit = fixtureLimit;
       
        dataService.getTeamData(team).then(function(result){
          $scope.hometeamData = result.data;
            var homeurl = $scope.hometeamData._links.self.href
          console.log("the home team data is: "+ $scope.hometeamData.name)
          $scope.homeTeamName = $scope.hometeamData.name
        

          dataService.geTeamSpecData(homeurl).then(function(result){
            $scope.homeDataId = result.data._links.fixtures.href;
            var fixturesUrl = $scope.homeDataId;
            console.log("the fixtures :"+ fixturesUrl)

             dataService.getFixtures(fixturesUrl).then(function(result){
              unfiltered= result.data.fixtures;
              var homefixture = result.data.fixtures[0].homeTeamName
             $scope.fixtures =awfilter.filterdDates(unfiltered)

           

                for (var i = 0; i < $scope.fixtures.length; i++) {
                  
                   
                 if ($scope.fixtures[i].homeTeamName == $scope.homeTeamName) {
                  $scope.venue.push({"location":"H", "class":"home"})
                  $scope.against.push({"team" : $scope.fixtures[i].awayTeamName} )
                  $scope.class="location home";
                  

                 } 
                 else{
                  $scope.venue.push({"location":"A", "class":"away"})
                  $scope.against.push({"team" : $scope.fixtures[i].homeTeamName} )
                  $scope.class="location away";
                 
                 }
                }

              
             })
          });
        })
     
      
    


        
     

         
      }

 

         $scope.addLimit= function(){
        $scope.limit= fixtureLimit + fixtureLimit
        console.log("Added scope limit to :" + $scope.limit)
       }
     



    
      
    
    
     }
     
     

  }

})();