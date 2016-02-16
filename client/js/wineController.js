(function(){
  angular.module('wineApp')
  .controller('WineController', ['$http', WineController]);

  function WineController($http){
    var self = this;
    var base_url = '/api/';
    var api_key = '';

    self.maker;
    self.varietal;
    self.results = [
      {
        appellation: "Other California",
        label: "http://cache.wine.com/labels/111890m.jpg",
        maker: "Bogle Vineyards",
        name: "Bogle Chardonnay 2010",
        price: "$10.29 - $12.29",
        region: "California",
        score: 89,
        varietal: "Chardonnay"
      },
      {
        appellation: "Other California",
        label: "http://cache.wine.com/labels/134749m.jpg",
        maker: "Bogle Vineyards",
        name: "Bogle Chardonnay 2013",
        price: "$8.99 - $9.99",
        region: "California",
        score: 89,
        varietal: "Chardonnay"
      },
      {
        appellation: "Other California",
        label: "http://cache.wine.com/labels/125157m.jpg",
        maker: "Bogle Vineyards",
        name: "Bogle Chardonnay 2012",
        price: "$9.99 - $10.99",
        region: "California",
        score: 88,
        varietal: "Chardonnay"
      }
    ];

    self.loading = false;
    self.showForm = true;

    self.doBlur = function($event){
      if($event.which == 13) {
        $event.target.blur();
      }
    }

    self.clearResults = function(){
      self.results = [];
    }

    self.getInfo = function(){
      if(self.results.length){
        self.clearResults();
      }
      makeQuery(self.maker, self.varietal);
      self.maker = null;
      self.varietal = null;
      self.loading = true;
    }

    function makeQuery(){
      var args = [].slice.call(arguments);

      var qArr = args.map(function(arg){
        if(arg !== undefined && arg !== ''){
          return arg.split(' ').join('+');
        }
      });
      
      $http({
        method: 'GET',
        url: base_url + qArr.join('+'),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        self.loading = false;
        res.data.Products.List.forEach(function(wine){
          self.results.push({
            maker: wine.Vineyard.Name,
            name: wine.Name,
            varietal: wine.Varietal.Name,
            label: wine.Labels[0].Url,
            appellation: wine.Appellation.Name,
            region: wine.Appellation.Region.Name,
            score: wine.Ratings.HighestScore,
            price: '$' + wine.PriceMin + " - $" + wine.PriceMax
          });
        });
        console.log("results: ", self.results);
      })
      .catch(function(err){
        self.loading = false;
        console.log(err);
      });
    } // makeQuery END

  } // WineController END
})(); // IIFE END
