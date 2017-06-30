angular.module('app')
	.controller('meCtrl', ['$scope','$state','cache', function($scope,$state,cache){
		if(cache.get('name')){
			$scope.name = cache.get('name');
			$scope.image = cache.get('image');
			$scope.logout = function(){
				cache.remove('name');
				cache.remove('id');
				cache.remove('image');
				$state.go('main');
			}
		};

		
	}]);