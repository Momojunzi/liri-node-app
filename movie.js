
var request = require('request');

var movie = function(search) {
	var key = '40e9cece'
	var movieTitle = search;
	if(movieTitle === ""){
		movieTitle = "Mr. Nobody"
	}
	request('http://www.omdbapi.com/?apikey=' + key + '&t=' + movieTitle, function(error, response, body) {
		if(error) {
			console.log('error');
		}else {
			var movieInfo = JSON.parse(body);
			console.log('\nTitle: '+movieInfo.Title+'\nYear: '+movieInfo.Year+'\nIMDB rating: '+movieInfo.Ratings[0].Value+
				'\nRotten Tomatoes: '+movieInfo.Ratings[1].Value+'\nCountry: '+movieInfo.Country+'\nLanguage: '+movieInfo.Language+
				'\nPlot: '+movieInfo.Plot+'\nActors: '+movieInfo.Actors);
		}
	});
};

module.exports = movie;