(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")

    $scope.selected = "mine"
    var fixtureLimit;


    var hometeamData;
  	
    this.$onInit = function(){

         // Away team
     this.initiateAway= function(){
      console.log("Away initiated")
     }     


      // home team

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
       //set league for away team
       this.selectedAwLg= function(league){
      dataService.getTeams(league).then(function(result){
        $scope.Awteams = result.data.teams;
        // console.log($scope.teams)
      });
 }
       //set fixtures for home team
        
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
              $scope.fixtures= result.data.fixtures;
              var homefixture = result.data.fixtures[0].homeTeamName
               $scope.venue=[];
               $scope.against =[]

                for (var i = 0; i < $scope.fixtures.length; i++) {
                  
                   
                 if ($scope.fixtures[i].homeTeamName == $scope.homeTeamName) {
                  $scope.venue.push({"location":"H"})
                  $scope.against.push({"team" : $scope.fixtures[i].awayTeamName} )
                  

                 } 
                 else{
                  $scope.venue.push({"location":"A"})
                  $scope.against.push({"team" : $scope.fixtures[i].homeTeamName} )
                 
                 }
                }
                // $scope.determineVenue = function(venue){
                //   console.log("its been called with: "+ venue)
                //   if(venue == $scope.hometeamData.name){
                //     $scope.venue ="H"

                //   }
                //   else 
                // {
                //   $scope.venue ="A"
                // }

                // }
              
             })
          });
        })
     
      
    
        // dataService.getFixtures($scope.hometeamData._links.self.href).then(function(result){
        //   $scope.fixtures= result.data.fixtures
        

        
        // })

         
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