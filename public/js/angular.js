


//tiene que estar en public
(function(){

	var app = angular.module('producto',[
		'ngRoute',
		'angular-md5',
		'btford.socket-io',
		'producto.controllers',
		'producto.directives',
		'producto.filters',
		'producto.services'
	]);

	app.config(['$routeProvider',function ($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : 'views/tienda.html',
				controller : 'TiendaController'
			})

			.when('/:type', {
        		templateUrl: 'views/tienda.html',
        		controller: 'TiendaController'
      		})
      		.when('/producto/:name', {
        		templateUrl: 'views/producto.html',
        		controller: 'ProductoController'
      		})
      		.otherwise({
        	redirectTo: '/'
      		});
	}]);

})();