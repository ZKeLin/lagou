angular.module('app')
	.controller('favoriteCtrl', ['$scope','$http', function($scope,$http){
		$http.get('data/myFavorite.json').then(function(resp){
			$scope.lists = resp.data;
		})
	}]);