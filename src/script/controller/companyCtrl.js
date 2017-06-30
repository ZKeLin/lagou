angular.module('app')
	.controller('companyCtrl', ['$http','$state','$scope', function($http,$state,$scope){
		$http({method:'GET',url:'/data/company.json?id='+$state.params.id}).then(function(resp){
			$scope.company = resp.data;
		});
	}]);