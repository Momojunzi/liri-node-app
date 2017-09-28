var spotify = require('./spotify.js');
var movie = require('./movie.js');
var fs = require('fs');

var random = function(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if(err){
			console.log(err);
		}else{
			var command = data.split(',');
			for(var i=0; i<command.length; i++){
				if(command[i] === 'spotify-this-song' || command[i] === 'movie-this'){
					if(command[i] === "spotify-this-song") {
						spotify(command[i+1]);
					}
					if(command[i] === 'movie-this'){
						movie(command[i+1]);
					}
				}
			}
		}
	});
};

module.exports = random;