var twitterKeys = require('./keys');
var moment = require('moment-twitter');
var Twitter = require('twitter');

var twitter = function(){
	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
	  	access_token_key: twitterKeys.access_token_key,
	  	access_token_secret: twitterKeys.access_token_secret
	});

	client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {		
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
};

module.exports= twitter;