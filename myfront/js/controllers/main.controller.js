(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope', 'filter', 'compare', 'logos']

  function mainCtrl(dataService, $scope , filter, compare, logos){
  	console.log("test")

    $scope.selected = "mine"
    var fixtureLimit =5;
    //$scope.class="location home"
     // $scope.dataset =[];
     $scope.teams =[];
     $scope.fixtures=[];
     $scope.choosenHomeTeam =[];
     $scope.selectedteams;
     $scope.venue=[];
      $scope.against =[];
      $scope.myLogos =[]
         var unfiltered =''



    var hometeamData;
  	
    this.$onInit = function(){
     dataService.getLeagues().then(function(result){
     $scope.dataset = result.data; //set initial data for all competions/leagues

     console.log($scope.dataset.length)
    
      });
          
      this.selectedLg= function(league){  //get selected league to this function
        console.log("this is the selected league: "+ league)
        

      dataService.getTeams(league).then(function(result){  //send selected league to dataservice and get back teams name and caption
        $scope.teams = result.data.teams;
       //console.log("can we get team "+ $scope.teams[0].name)
      });
      compare.leagueScore(league)
       }

        
        this.selectedTm = function(team){  //get selected team from team drop drown and assign to to team href
        $scope.limit = fixtureLimit;
       
        dataService.getTeamData(team).then(function(result){ // pass team to dataService.getteam data and get back data
          $scope.hometeamData = result.data;
            var homeurl = $scope.hometeamData._links.self.href //set homeurl to the team individual url data
          // console.log("the home team data is: "+ $scope.hometeamData.name)
          // console.log("the home team url is:  "+ homeurl)

          $scope.homeTeamName = $scope.hometeamData.name //set team name to name home team data
        

          dataService.geTeamSpecData(homeurl).then(function(result){ //home url to dataService to get its fixtures
            $scope.homeDataId = result.data._links.fixtures.href;
            var fixturesUrl = $scope.homeDataId;
            // console.log("the fixtures :"+ fixturesUrl)

             dataService.getFixtures(fixturesUrl).then(function(result){ //pass fixtures to dataService to get back all fixtures
               unfiltered= result.data.fixtures;
              var homefixture = result.data.fixtures[0].date;
              console.log(homefixture)


              $scope.fixtures = filter.filterdDates(unfiltered) //pass fixtures to filter to start only from today
              var totalHomeFixture =0;
              var totalAwayFixture =0;

               for (var i = 0; i < $scope.limit; i++) { //sort which are at home and which fixtrues are away
                  
                   
                 if ($scope.fixtures[i].homeTeamName == $scope.homeTeamName) {
                  totalHomeFixture++;
                  $scope.venue.push({"location":"H", "class":"home"})
                  $scope.against.push({"team" : $scope.fixtures[i].awayTeamName} )
                  $scope.class="location home";
                  

                 } 
                 else{
                  totalAwayFixture++;
                  $scope.venue.push({"location":"A", "class": "away"})
                  $scope.against.push({"team" : $scope.fixtures[i].homeTeamName} )
                  $scope.class="location away";
                 
                 }
                }

               if(totalHomeFixture>totalAwayFixture){
                console.log( "has more home games than away games by: ")
               }
               else{
                console.log("more away games")
               }


              
             })
          });
        })
     
      }
     logos.getLogos().then(function(result){
      $scope.myLogos = result.data;
       console.log("the logos array: "+ result.data[0].logo)
     })
     

     


 

         $scope.addLimit= function(){
        $scope.limit= fixtureLimit + fixtureLimit
        console.log("Added scope limit to :" + $scope.limit)
       }
     



    
      
    
    
     }
     
     

  }

})();