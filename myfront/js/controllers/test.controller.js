(function(){
	angular.module('fixApp')
	.controller('testCtrl', testCtrl)
   
   testCtrl.$inject =['$scope'];


	function testCtrl($scope){


				$scope.items = [{
				  id: 1,
				  label: 'aLabel',
				  subItem: { name: 'aSubItem' }
				}, {
				  id: 2,
				  label: 'bLabel',
				  subItem: { name: 'bSubItem' }
				}];

$scope.selected = $scope.items[1];

// console.log($scope.selected)

       $scope.data = {
    // model: null,
    availableOptions: [
      {id: '1', name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ]
   };
 $scope.data.model;
   // console.log($scope.data.model)


   $scope.mytest = function(mine){
   	// console.log(mine);
   }


	}


})();