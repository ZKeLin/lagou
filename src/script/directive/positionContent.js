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