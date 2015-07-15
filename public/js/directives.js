(function () {

  angular.module('producto.directives', [])
    .directive('productoName', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-name.html'
      };
    })

    .directive('productoImage', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-image.html'
      };
    })

    .directive('productoData', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-data.html'
      };
    })

    .directive('productoCaracteristicas', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-caracteristicas.html'
      };
    })

    .directive('productoSimilar', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/producto-similar.html'
      };
    })

    .directive('productoType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-type.html'
      };
    })

    .directive('productoCard', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/producto-card.html'
      }
    })

    .directive('productoComments', ['productoService', function (productoService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/producto-comments.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.comments = productoService.getComments(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.comments = productoService.getComments($scope.name);
          $scope.comment = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.comment.anonymous) {
              $scope.comment.email = "";
            }
          };

          $scope.addComment = function () {
            $scope.comment.date = Date.now();
            productoService.saveComment($scope.name, $scope.comment);
            $scope.comments = productoService.getComments($scope.name);
            $scope.comment = {};
          };

        }
      };
    }]);

})();
