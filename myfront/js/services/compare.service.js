(function(){

	angular.module('fixApp')
	.service('compare', compare)
  function compare(){
  	var leagueStrength;

  	var leagueIndex ={"444":"3", "445": "1", "446":"4", "447":"6", "448":"7", "449":"4", 
  	                  "450":"2", "451":"6", "452":"2", "453":"6", "455":"1", "456":"2", 
  	                  "457":"5", "458":"3", "459":"6", "464":"1", "466": "6"}

  	this.leagueScore = function(leagueId){
  	  leagueStrength = leagueIndex[leagueId]


  	}


    
  }
})();