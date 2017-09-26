var twitterKeys = require('./keys');
var moment = require('moment-twitter');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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
			this.twitter();
		}
		if (this.arg === 'spotify-this-song'){
			this.spotify(this.searchTerm());
		}
		if (this.arg === 'movie-this') {
			this.movie(this.searchTerm());
		}
		if (this.arg === 'do-what-it-says') {
			this.random();
		}
	},

	twitter: function(){
		var client = new Twitter({
			consumer_key: twitterKeys.consumer_key,
			consumer_secret: twitterKeys.consumer_secret,
		  	access_token_key: twitterKeys.access_token_key,
		  	access_token_secret: twitterKeys.access_token_secret
		});

		client.get('statuses/user_timeline', function(error, tweets, response) {		
			var limit = 20;
			if(error) {
				console.log(error);
			}
			else {
				if(tweets.length < 20){
					limit = tweets.length;
				}
				for(var i=0; i<limit; i++) {
					var date = tweets[i].created_at.split(' ')
					var hoursAgo = moment(tweets[i].created_at).twitter();
					date.splice(4, 1);
					date = date.join(' ');
					console.log('\ntweet: ' + tweets[i].text + '\ncreated on: ' + date + ' ' + hoursAgo + ' ago');
				}
			}
		});
	},

	spotify: function(search){
		var spotify = new Spotify({
			id: 'ead8f99c79e748f5bae800a409fdca2c',
			secret: '6a0147fcd0554ef9ae84e9438ea272c6'
		});
		var track = search;
		var artist, link, album, name;
		if (track === ""){
			spotify
				.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
				.then(function(data) {
			    	artist = data.artists[0].name;
					album = data.album.name;
					link = data.preview_url;
					name = data.name;
					console.log('\nArtist: ' + artist + '\nTrack: ' + name + '\nPreview: ' + link + '\nAlbum: ' + album);
				})
				.catch(function(err) {
				console.error('Error occurred: ' + err); 
				});
		}
		else{
			spotify
				.search({type: 'track', query: track})
				.then(function(data){
					artist = data.tracks.items[0].artists[0].name;
					album = data.tracks.items[0].album.name;
					link = data.tracks.items[0].preview_url;
					name = data.tracks.items[0].name;
					console.log('\nArtist: ' + artist + '\nTrack: ' + name + '\nPreview: ' + link + '\nAlbum: ' + album);
				})
				.catch(function(err){
					console.log(err);
				}) ;
		}
	},

	movie: function(search) {
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
	},

	random: function(){
		fs.readFile('random.txt', 'utf8', function(err, data){
			if(err){
				console.log(err);
			}else{
				var command = data.split(',');
				for(var i=0; i<command.length; i++){
					if(command[i] === 'spotify-this-song' || command[i] === 'movie-this'){
						if(command[i] === "spotify-this-song") {
							app.spotify(command[i+1]);
						}
						if(command[i] === 'movie-this'){
							app.movie(command[i+1]);
						}
					}
				}
			}
		});
	}

}

app.start();