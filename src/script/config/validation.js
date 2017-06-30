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