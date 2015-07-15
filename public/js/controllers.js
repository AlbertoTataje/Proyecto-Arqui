(function () {

  angular.module('producto.controllers', [])
    .controller('TiendaController', ['$rootScope', '$scope', '$routeParams', 'productoService', function ($rootScope, $scope, $routeParams, productoService) {
      var type = $routeParams.type;
      var productos = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;

        productoService.byType(type).then(function (data) {
          $scope.productos = productos = data;
          $scope.groupped = partition(data, 4);
        });
      } else {
        productoService.all().then(function (data) {
          $scope.productos = productos = data;
          $scope.groupped = partition(data, 4);
        });
      }


      $scope.search = function () {
        var result = productos;
        if ($scope.searchTerm) {
          result = productos.filter(function (producto) {
            var name = producto && producto.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.productos = result;
        $scope.groupped = partition(result, 4);
      };


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('ProductoController', ['$rootScope', '$scope', '$routeParams', 'productoService', function ($rootScope, $scope, $routeParams, productoService) {
      var name = $routeParams.name;

      productoService.byName(name)
      .then(function (data) {
        $rootScope.title = data.name;
        $scope.producto = data;
      });
    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 1;

      $scope.selectTab = function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };
    }]);

})();
