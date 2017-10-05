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
 	 	// .then(function(response) {
    //     return response;
    // });
 	 }

 }

})();