(function(){
 angular.module('fixApp')
 .service('dataService', dataService)

 dataService.$inject = ['$http']

 function dataService($http){
 	 var service = this;
 	 service.getLeagues = function(){
 	 	return $http({
 	 		headers: { 'X-Auth-Token': 'a0e3c08f477f4a7c826355dfeaf56857' },
 	 		method:"GET",
 	 		dataType: 'json',
 	 		url:('data.json')
 	 	})	
 	 
   	 }

 	 service.getTeams = function(competition){
 	 	return $http({
 	 		headers: { 'X-Auth-Token': 'a0e3c08f477f4a7c826355dfeaf56857' },
 	 		method:"GET",
 	 		dataType: 'json',
 	 		url:('http://api.football-data.org/v1/competitions/'+ competition +'/teams')

 	 	})
 	 }

 	 service.getFixtures = function(fixtures){
 	 	return $http({
 	 		headers:{'X-Auth-Token': 'a0e3c08f477f4a7c826355dfeaf56857'},
 	 		method: "Get",
 	 		dataType:'json',
 	 		url:(fixtures)
 	 	})
 	 }

  service.getTeamData = function(data){
  	return $http({
  		headers:{'X-Auth-Token': 'a0e3c08f477f4a7c826355dfeaf56857'},
 	 		method: "Get",
 	 		dataType:'json',
 	 		url:(data)
  	})
  }

  service.geTeamSpecData = function(data){
  	return $http({
  		headers:{'X-Auth-Token': 'a0e3c08f477f4a7c826355dfeaf56857'},
 	 		method: "Get",
 	 		dataType:'json',
 	 		url:(data)

  	})
  }

 }



})();