angular.module('app')
	.controller('loginCtrl', ['$scope','cache','$state','$http', function($scope,cache,$state,$http){
		$scope.submit = function(){
			$http.post('/data/login.json',$scope.user).success(function(resp){
				var respData = resp.data;
				cache.put('id',respData.id);
				cache.put('name',respData.name);
				cache.put('image',respData.image);
				$state.go('main');
			});
		}
	}]);