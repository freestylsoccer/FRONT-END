'use strict';
angular.module("controllers",[])

.controller("MenuCtrl",['$scope', '$state','MenuFactory',function($scope, $state, MenuFactory){
    //$scope.Validate = redirectWhenLoggedOut.responseError();
    $scope.Menu = MenuFactory.query();
    $scope.removeMenu = function(menu_id){
    	console.log(menu_id);
    		MenuFactory.delete({
    	id: menu_id
    });
    }

    /*$scope.token = false;
    $scope.token = localStorage.getItem('satellizer_token');
    console.log($scope.token);
    if ($scope.token === null) {
       $state.go('app', {});
   }*/
    
    
}])
.controller("CreateMenuCtrl",['$scope','MenuFactory',function($scope,MenuFactory) {
	$scope.Menu = {};
    
    var self = this;
    $scope.saveMenu =  function() {
        var fd = new FormData();
        var data = $scope.Menu;
        console.log(data);
        for (var key in data) {
            fd.append(key, data[key]);
        }
        console.log(data[key]);
        MenuFactory.create({},fd).$promise.then(function(res) {
            self.newPost = res;
        }).catch(function(err) {
            self.newPostError = true;
            throw err;
        });
    };

    /* 
	$scope.saveMenu = function(){
		console.log($scope.Menu);
		MenuFactory.save($scope.Menu);
	};
	/*$scope.Menu = {};
	$scope.saveMenu = function() {
 		console.log($scope.Menu);
        $http.post('http://localhost:8000/menu', {
            
        }).success(function(response) {
            // console.log(vm.jokes);
            // vm.jokes.push(response.data);
            
            console.log($scope.Menu);
            $scope.Menu = '';
            // alert(data.message);
            // alert("Joke Created Successfully");
        }).error(function(){
          console.log("error");
        });
    };*/
}])
.controller('EditMenuCtrl',['$scope','MenuFactory','$stateParams',function($scope,MenuFactory,$stateParams) {
	$scope.Menu = {};
	$scope.Menu = MenuFactory.get({id:parseInt($stateParams.id,10)});
	console.log($scope.Menu);
	
    $scope.saveMenu = function () {
    	console.log($scope.Menu);
    	MenuFactory.update($scope.Menu);	
    }
    
}])
.controller('AuthCtrl', function($scope, $auth, $state, $rootScope,$location) {

    $scope.credentials = {};
    $scope.login = function(){
        $scope.credentials;
        $auth.login($scope.credentials).then(function(data) {
        $state.go('app.menu', {});
        });
    }

    $scope.logout = function(){
        $auth.logout().then(function() {
            localStorage.removeItem('satellizer_token');

            $rootScope.authenticated = false;

            $rootScope.currentToken = null;
            $location.path('/');
        });
    }
})
;



