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