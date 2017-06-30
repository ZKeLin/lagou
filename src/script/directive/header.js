angular.module('app')
	.directive('appHeader',['cache',function(cache){
		return {
			restrict:'A',
			replace: true,
			templateUrl: '../view/template/header.html',
			controller: '',
			link: function($scope){
				$scope.name = cache.get('name')||'';
			}
		}
	}]);