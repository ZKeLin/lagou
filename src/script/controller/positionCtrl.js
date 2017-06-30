angular.module('app')
	.controller('positionCtrl',['cache','$q','$http','$state','$scope',function(cache,$q,$http,$state,$scope){
		$scope.name = cache.get('name') || '';
		function getPosition(){
			var def = $q.defer();
			$http({method:'GET',url:'/data/position.json?id='+$state.params.id}).then(function(resp){
				$scope.position = resp.data;
				def.resolve(resp);
			},function(err){
				def.reject(err);
			});
			return def.promise;
		};
		function getCompany(id){
			$http({method:'GET',url:'/data/company.json?id='+id}).then(function(resp){
				$scope.company = resp.data;
			});
		};
		getPosition().then(function(obj){
			getCompany(obj.data.id);
		});
		$scope.post = function(){
			$http.post('/data/myPost.json',{
			}).success(function(resp){
				console.log(resp.data);
			});
		}
		
	}]);