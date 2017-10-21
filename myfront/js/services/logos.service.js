(function(){
	angular.module('fixApp')
	.service('logos', logos)

	logos.$inject =['$http']

	function logos($http){

		this.getLogos = function(){
		return $http({
		   method:"GET",
 	 		dataType: 'json',
 	 		url:('logos.json')
		})
	}
	}
})();