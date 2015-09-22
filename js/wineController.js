angular.module('wineApp')
  .controller('WineController', WineController);

WineController.inject = ['$http'];

function WineController ($http) {
  var self = this;
  var base_url = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog?search=';
  var api_key = '';
  self.maker;
  self.varietal;
  self.wineName;
  self.results = [];

  self.getInfo = function(){
    console.log("INFO FOR: maker: ", self.maker);
    console.log("INFO FOR: varietal: ", self.varietal);
    console.log("INFO FOR: name: ", self.wineName);

    var query = makeQuery(self.maker, self.varietal, self.wineName);
  }

  function makeQuery(){
    var args = [].slice.call(arguments);

    var qArr = args.map(function(arg){
      if(arg !== undefined && arg !== ''){
        return arg.split(' ').join('+');
      }
    });
    
    $http({
      url: base_url + qArr.join('+') + api_key,
      method: 'GET'
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
      console.error(err);
    });
  } // makeQuery END

} // WineController END