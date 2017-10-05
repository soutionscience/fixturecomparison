(function(){
  angular.module('fixApp').controller('mainCtrl', mainCtrl)

  mainCtrl.$inject =['dataService', '$scope']

  function mainCtrl(dataService, $scope){
  	console.log("test")


  	$scope.dataset =[];

     this.$onInit = function(){
     	dataService.getLeagues().then(function(result){
     		$scope.dataset = result.data;
     		console.log(result)

     	});

     	console.log($scope.dataset)
     }

  }

})();