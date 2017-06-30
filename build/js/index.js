'use strict';

angular.module('app',['ui.router','ngCookies','validation']);
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
angular.module('app').config(['$provide',function($provide) {
	console.log($provide);
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		$delegate.post = function(url, data, config){
			var def = $q.defer();
			$delegate.get(url).then(function(resp){
				def.resolve(resp);
			},function(err){
				def.reject(err);
			});
			return {
				success: function(cb){
					def.promise.then(cb);
				},
				error:function(cb){
					def.promise.then(null,cb);
				}
			}
		}
		return $delegate;
	}]);
}]);
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$stateProvider.state('main',{
			url: '/main',
			templateUrl: 'view/main.html',
			controller: 'mainCtrl'
		}).state('position',{
			url: '/position/:id',
			templateUrl: 'view/position.html',
			controller: 'positionCtrl'
		}).state('company',{
			url: '/compant/:id',
			templateUrl: 'view/company.html',
			controller: 'companyCtrl'
		}).state('search',{
			url: '/search',
			templateUrl: 'view/search.html',
			controller: 'searchCtrl'
		}).state('login',{
			url: '/login',
			templateUrl: 'view/login.html',
			controller: 'loginCtrl'
		}).state('post',{
			url: '/post',
			templateUrl: 'view/post.html',
			controller: 'postCtrl'
		}).state('register',{
			url: '/register',
			templateUrl: 'view/register.html',
			controller: 'registerCtrl'
		}).state('me',{
			url: '/me',
			templateUrl: 'view/me.html',
			controller: 'meCtrl'
		}).state('favorite',{
			url: '/favorite',
			templateUrl: 'view/favorite.html',
			controller: 'favoriteCtrl'
		});
		$urlRouterProvider.otherwise('main');
}]);
angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression={
		phone:/^1[3|5|8][0-9]{9}$/,
		password: function(value){
			return value.length > 5;
		},
		required:function(value){
			return !!value;
		}
	};
	var defaultMsg = {
		phone: {
			success: '',
			error: '必须是国内通用为手机号'
		},
		password: {
			success: '',
			error: '长度至少6位'
		},
		required: {
			success: '',
			error: '不能为空'
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
angular.module('app')
	.controller('companyCtrl', ['$http','$state','$scope', function($http,$state,$scope){
		$http({method:'GET',url:'/data/company.json?id='+$state.params.id}).then(function(resp){
			$scope.company = resp.data;
		});
	}]);
angular.module('app')
	.controller('favoriteCtrl', ['$scope','$http', function($scope,$http){
		$http.get('data/myFavorite.json').then(function(resp){
			$scope.lists = resp.data;
		})
	}]);
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
angular.module('app')
	.controller('postCtrl', ['$scope','$http', function($scope,$http){
		$scope.lists = [{
			id:'all',
			name:'全部'
		},{
			id:'pass',
			name:'面试邀请'
		},{
			id:'fail',
			name:'不合适'
		}];
		$http.get('data/myPost.json').then(function(resp){
			$scope.positionList = resp.data;
		});
		$scope.filterObj = {};
		$scope.tClick = function(id,name){
			switch(id){
				case 'all':
					delete $scope.filterObj.state;
					break;
				case 'pass':
					$scope.filterObj.state = "1";
					break;
				case 'fail':
					$scope.filterObj.state = "-1";
					break;
				default: ;
			}
		}
	}]);
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
angular.module('app')
	.controller('searchCtrl', ['$scope','$http','dict',function($scope,$http,dict){
		$scope.name='';
		$scope.search = function(){
			$http({method:'GET',url:'/data/contentList.json?'+$scope.name}).then(function(resp){
				//console.log(resp);
				$scope.lists = resp.data;
			});
		};
		$scope.search();
		$scope.sheet = {};
		$scope.tabList = [{
			id: 'city',
			name: '城市'
		},{
			id: 'salary',
			name: '薪水'
		},{
			id: 'scale',
			name: '公司规模'
		}];
		var tabId = '';
		$scope.filterObj = {};
		$scope.tClick = function(id,name){
			$scope.sheet.list = dict[id];
			tabId = id;
			$scope.sheet.visible = true;
		};
		$scope.sClick = function(id,name){
			console.log(id);
			if(id){
				angular.forEach($scope.tabList,function(item){
					if(tabId === item.id){
						item.name = name;
					}
				});
				$scope.filterObj[tabId+'Id'] = id;
				console.log($scope.filterObj);
			}else{
				delete $scope.filterObj[tabId+'Id'];
				angular.forEach($scope.tabList,function(item){
					if(tabId === item.id){
						switch(item.id){
							case 'city':
								item.name = '城市'; break;
							case 'salary': 
								item.name = '薪水'; break;
							case 'scale':
								item.name = '公司规模';break;
						}
					}
				});
			}
		}
	}]);
angular.module('app')
	.directive('appContentList',['$http','cache',function($http,cache){
		return {
			restrict: 'A',
			replace: true,
			templateUrl: './view/template/contentList.html',
			controller: 'mainCtrl',
			scope: {
				data: '=',
				filterObj: '='
			},
			link: function($scope){
				$scope.name = cache.get('name') || '';
				$scope.select = function(item){
					$http.post('data/favorite.json',{
						id: item.id,
						select: item.select
					}).success(function(resp){
						item.select = !item.select;
					});
				}
			}

		}
	}]);
angular.module('app')
	.directive('appFooter',[function(){
		return{
			restrict: 'A',
			replace: true,
			templateUrl: './view/template/footer.html',
			controller: ''
		}
	}])
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
angular.module('app')
	.directive('appHeaderBar',[function(){
		return {
			restrict: 'A',
			replace: true,
			templateUrl: './view/template/headerBar.html',
			scope:{
				text: '='
			},
			link:function(scope){
				scope.back = function(){
					window.history.back();
				}
			}
		}
	}])
angular.module('app')
	.directive('appPositionClass',[function(){
		return {
			retrict: "A",
			replace: true,
			templateUrl: 'view/template/positionClass.html',
			scope: {
				com:'='
			},
			link: function($scope){
				$scope.showPositionList = function(index){
					$scope.positionList = $scope.com.positionClass[index].positionList;
					$scope.isActive = index;
				};
				$scope.$watch('com',function(newNum){
					if(newNum) $scope.showPositionList(0);
				})
			}
		}
	}])
angular.module('app')
	.directive("appCompany",[function(){
		return {
			resrict: "A",
			replace: true,
			templateUrl: './view/template/positionContent.html',
			scope:{
				com:'='
			},
			link: function(){
				
			}
		}
	}]);
angular.module('app')
	.directive('appPositionInfo',[function(){
		return {
			restrict: 'A',
			replace: true,
			templateUrl: './view/template/positionInfo.html',
			scope:{
				isActive: '=',
				isLogin: '=',
				pos: '=',
				com: '='
			},
			controller: 'positionCtrl',
			link:function(scope){
				scope.imgPath = scope.isActive?"../image/star-active.png":"../image/star.png";
			}
		}
	}])
angular.module('app')
	.directive('appSheet',[function(){
		return {
			restrict: 'A',
			replace: true,
			scope: {
				visible: '=',
				list: '=',
				select: '&'
			},
			templateUrl: '/view/template/sheet.html'
		}
	}]);
angular.module('app')
	.directive('appTab',[function(){
		return {
			restrict: 'A',
			replace:  true,
			scope: {
				list: '=',
				tabClick: '&'
			},
			templateUrl: './view/template/tab.html',
			link: function($scope){
				$scope.click = function(tab){
					console.log(tab);
					$scope.selectId = tab.id;
					$scope.tabClick(tab);
					console.log($scope.tabClick);
				}
			}
		}
	}])
angular.module('app')
	.filter('filterByObj',[function(){
		return function(list,obj){
			var result = [];
			angular.forEach(list,function(item){
				var isEquel = true;
				for(var e in obj){
					if(item[e]!==obj[e]){
						isEquel = false;
					}
				};
				if(isEquel){
					result.push(item);
				};
			});
			return result;
		};
	}]);
angular.module('app')
	.service('cache', ['$cookies', function($cookies){
		this.put = function(key,value){
			$cookies.put(key,value);
		};
		this.get = function(key){
			return $cookies.get(key);
		};
		this.remove = function(key){
			$cookies.remove(key);
		};
	}]);