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