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