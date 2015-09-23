angular.module('wineApp')
  .controller('WineController', WineController);

WineController.inject = ['$http'];

function WineController ($http) {
  var self = this;
  var base_url = 'http://localhost:3000/api/';
  var api_key = '';

  self.maker;
  self.varietal;
  self.results = [];

  self.getInfo = function(){
    makeQuery(self.maker, self.varietal);
    self.maker = null;
    self.varietal = null;
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
      console.log(self.results);
    })
    .catch(function(err){
      console.log(err);
    });
  } // makeQuery END

} // WineController END