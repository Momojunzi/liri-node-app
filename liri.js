var twitterKeys = require('./keys');
var moment = require('moment-twitter');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var app = {
	start: function() {
		var arg = process.argv[2];
		if (arg === 'my_tweets'){
			this.twitter();
		}
		if (arg === 'spotify-this-song'){
			this.spotify();
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

	spotify: function(){
		var spotify = new Spotify({
			id: 'ead8f99c79e748f5bae800a409fdca2c',
			secret: '6a0147fcd0554ef9ae84e9438ea272c6'
		});
		var args = process.argv;
		var track = "";
		var artist, link, album, name;
		for(var i=3; i<args.length; i++){
			track = track + args[i] + " "; 
		}
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
	}

}

app.start();