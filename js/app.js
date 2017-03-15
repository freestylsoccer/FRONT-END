'use strict';
angular.module('pizzaApp', ['ui.router','ngRoute','ngResource', 'satellizer','service', 'controllers','directive'])
.config(function($stateProvider, $urlRouterProvider, $authProvider){

	$stateProvider

	
	.state('app',{
		url:'/',
		views:{
			'header':{
				templateUrl:'views/header.html'
			},
			'content':{
				templateUrl:'views/home.html'
			},
			'footer':{
				templateUrl:'views/footer.html'
			}
		}
	})
	.state('app.menu',{
		url:'menu',
		views:{
			'content@':{
				templateUrl:'views/menu.html',
				controller:'MenuCtrl',
				resolve: {
		          authenticated: ['$location', '$auth', function($location, $auth) {
		            if (!$auth.isAuthenticated()) {
		              return $location.path('/login');
		            }
		          }]
		        }
			}
			
		}
	})
	.state('app.create',{
		url:'menu/new',
		views:{
		'content@':{
		templateUrl:'views/menucreate.html',
		controller:'CreateMenuCtrl',
		/*resolve: {
		          authenticated: ['$location', '$auth', function($location, $auth) {
		            if (!$auth.isAuthenticated()) {
		              return $location.path('/login');
		            }
		          }]
		        }*/
			}
		}
	})
	.state('app.edit',{
		url:'menu/edit/:id',
		views:{
		'content@':{
			templateUrl:'views/menuedit.html',
			controller:'EditMenuCtrl',
			resolve: {
		          authenticated: ['$location', '$auth', function($location, $auth) {
		            if (!$auth.isAuthenticated()) {
		              return $location.path('/login');
		            }
		          }]
		        }
			}
		}
	})
	.state('app.login',{
		url:'login',
		views:{
		'content@':{
			templateUrl:'views/login.html',
			controller:'AuthCtrl'
			}
		}
	});
	$authProvider.loginUrl = 'http://localhost:8000/api/authenticate';
	$urlRouterProvider.otherwise('/');
	  
});