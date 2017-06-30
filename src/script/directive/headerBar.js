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