
var Spotify = require('node-spotify-api');

var spotify = function(search){
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
};

module.exports = spotify;