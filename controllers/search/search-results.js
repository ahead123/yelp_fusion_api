module.exports = function(router){

	var yelp = require('yelp-fusion'),
	clientId=process.env.CLIENT_ID,
	clientSecret=process.env.CLIENT_SECRET;
	
	router.route('/search/search-results') 
	 .post(function(req, res) {
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
}