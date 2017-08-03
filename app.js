'use strict';

const yelp = require('yelp-fusion'),
clientId = 'b42XPRn4eTQOh81QipphNA',
clientSecret = 'axZ7Y2ujQ0I07MalkP76FvRrJv6EpghqFnW4GbUIgdqVMvN22tdYrnlDfqRR1tIS',
express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set("views", __dirname + "/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/views"));

app.get('/', function (req, res) {
  res.render('/')
})

app.post('/search-results', function (req, res) {
	var location = req.body.location;
	var term = req.body.term;

	function capitalizeFirstLetter(string) {
		if(string.indexOf(" ")>-1){
			var charAfterSpace = string.indexOf(" ")+1;
			return string.charAt(0).toUpperCase() + string.slice(1, charAfterSpace) + string.charAt(charAfterSpace).toUpperCase() + string.slice(charAfterSpace+1)
		} else {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}

	location = capitalizeFirstLetter(location);
	term = capitalizeFirstLetter(term);

	yelp.accessToken(clientId, clientSecret).then(response => {
		const client = yelp.client(response.jsonBody.access_token);
		client.search({
		  term: term,
		  location: location
		}).then(response => {
		  var data = response.jsonBody;
		  var category = data.businesses[0].categories[0].title		  
		  res.render('search_results', { location:location, term:term, data:data, category:category } )
		});
		}).catch(e => {
		console.log(e);
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})






