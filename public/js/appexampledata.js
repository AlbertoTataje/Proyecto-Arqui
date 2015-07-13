  (function () {
  var app = angular.module('producto', []);

  app.controller('productoController', function () {
    this.producto = {
      id: "001",
      name: "cocina",
      marca: "Solgas",
      type: [ "Casa", "electrico" ],
      height: "2′4″ (0.71m)",
      weight: "15.2 lbs (6.9 kg)",
      caracteristicas: [ "4 hornillas", "A gas" ],
      stats: {
        precio: 1500,
        stock:   10,
        annio : 2010,
        "sp.atk": 65,
        "sp.def": 65,
        garantia: 12,
        descuento : -10
      },
      similares: [ "refri", "tele", "horno"]
    };

  });

  app.controller('TabsController', function () {
    this.tab = 1;

    this.selectTab = function (tab) {
      this.tab = tab;
    };

  });

  app.filter('imageify', function () {
    return function (input) {
      var url = "img/productos/" + input.toLowerCase() + ".jpg";
      return url;
    };
  });

})();
