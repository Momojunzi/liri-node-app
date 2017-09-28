
var twitter = require('./twitter.js');
var spotify = require('./spotify.js');
var movie = require('./movie.js');
var random = require('./random.js');

var app = {
	arg: process.argv[2],
	
	searchTerm: function(){
		var title = "";
		for (var i=3; i<process.argv.length; i++){
			title += process.argv[i] + ' '; 
		}
		return title;
	},
	
	start: function() {		
		if (this.arg === 'my-tweets'){
			twitter();
		}
		if (this.arg === 'spotify-this-song'){
			spotify(this.searchTerm());
		}
		if (this.arg === 'movie-this') {
			movie(this.searchTerm());
		}
		if (this.arg === 'do-what-it-says') {
			random();
		}
	}
}

app.start();