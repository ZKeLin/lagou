angular.module('app')
	.controller('registerCtrl', ['$interval','$scope','$http','$state', function($interval,$scope,$http,$state){
		$scope.submit = function(){
			$http.post('data/register.json',$scope.user).success(function(resp){
				$state.go('login');
			});
		};
		$scope.send = function(){
			var count = 60;
			$scope.time = '60s';
			$http.get('/data/code.json').then(function(resp){
				console.log(resp); 	//Object {data: Object, status: 200, config: Object, statusText: "OK"}
				if(1===resp.data.state){
					var interval = $interval(function(){
						if(count <= 0){
							$interval.cancel(interval);
							$scope.time = '';
						}else{
							count--;
							$scope.time = count + 's';
						}
				},1000);
					
				}
			});
		}
	}]);