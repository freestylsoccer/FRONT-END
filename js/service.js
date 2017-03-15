'use strict';
angular.module('service',[])
	.factory('MenuFactory',['$resource',function($resource){
			return $resource ('http://localhost:8000/menu/:id',{id:'@menu_id'},{update:{method:'PUT'},
				create : {
					method:'POST',
					transformRequest : angular.identity,
					headers : {'Content-type' : undefined}
			}} 
			)
		}]);