(function(){
  angular.module('wineApp')
  .controller('WineController', ['$http', WineController]);

  function WineController($http){
    var self = this;
    var base_url = '/api/';
    var api_key = '';

    self.maker;
    self.varietal;
    self.results = [];

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

    self.openForm = function(){
      self.showForm = true;
    }
  } // WineController END
})(); // IIFE END
