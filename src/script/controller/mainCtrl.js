angular.module('app')
	.controller('mainCtrl', ['$scope','$http','cache',function($scope,$http,cache){
		$http({method:'GET',url:'/data/contentList.json'}).then(function(resp){
			//console.log(resp);
			$scope.lists = resp.data;
		},function(err){
			throw err;
		});
		if(cache.get(name)){
			$scope.name = cache.get(name);
		}
		// $scope.lists = [{
		// 	id: 1,
		// 	name: '销售',
		// 	companyName: '千鸟',
		// 	imgSrc: '../image/aa.jpg',
		// 	city: '上海',
		// 	industry: '互联网',
		// 	time: '2016-11-03 11:03'
		// },{
		// 	id: 2,
		// 	name: '销售',
		// 	companyName: '千鸟',
		// 	imgSrc: '../image/aa.jpg',
		// 	city: '上海',
		// 	industry: '互联网',
		// 	time: '2016-11-03 11:03'
		// }];
	}]);