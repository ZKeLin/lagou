//定义全局变量dict，相当于定义了个服务
angular.module('app')
	.value('dict',{}).run(['$http','dict', function($http,dict){
		$http({method:'GET',url: 'data/city.json'}).then(function(resp){
			dict.city = resp.data;
		});
		$http({method:'GET',url: 'data/salary.json'}).then(function(resp){
			dict.salary = resp.data;
		});
		$http({method:'GET',url: 'data/scale.json'}).then(function(resp){
			dict.scale = resp.data;
		});
	}])