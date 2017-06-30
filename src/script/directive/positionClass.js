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