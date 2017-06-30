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