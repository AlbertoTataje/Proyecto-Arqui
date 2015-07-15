(function () {

  angular.module('producto.services', [])

    .factory('productoService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

      function all() {
        var deferred = $q.defer();

        $http.get('/productos')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }


      function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (producto) {
            return normalize(producto.name) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (producto) {
            return producto.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }


      function saveComment(producto, comment) {
        var comments = getComments(producto);

        comments.push(comment);
        localStorage.setItem(producto, JSON.stringify(comments));
      }

      function getComments(producto) {
        var comments = localStorage.getItem(producto);

        if (!comments) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }

        return comments;
      }

      return {
        all: all,
        byName: byName,
        byType: byType,
        saveComment: saveComment,
        getComments: getComments
      };

    }]);

})();
