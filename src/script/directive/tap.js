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