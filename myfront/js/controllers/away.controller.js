(function(){
  angular.module('fixApp').controller('awayCtrl', awayCtrl)

  awayCtrl.$inject =['dataService', '$scope']

  function awayCtrl(dataService, $scope){
    console.log("test")

    $scope.selected = "mine"
    var fixtureLimit =5;
    $scope.class="location home"


    var hometeamData;
    
    this.$onInit = function(){


     $scope.dataset =[];
     $scope.teams =[];
     $scope.fixtures=[];
     $scope.choosenHomeTeam =[];
     $scope.selectedteams
     var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
     console.log("todays date is :" +dd +'/'+mm+'/'+yyyy)
     

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
              $scope.fixtures= result.data.fixtures;
              var homefixture = result.data.fixtures[0].homeTeamName
               $scope.venue=[];
               $scope.against =[]

                for (var i = 0; i < $scope.fixtures.length; i++) {
                  
                   
                 if ($scope.fixtures[i].homeTeamName == $scope.homeTeamName) {
                  $scope.venue.push({"location":"H", "class":"home"})
                  $scope.against.push({"team" : $scope.fixtures[i].awayTeamName} )
                  $scope.class="location home";
                  

                 } 
                 else{
                  $scope.venue.push({"location":"A"})
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