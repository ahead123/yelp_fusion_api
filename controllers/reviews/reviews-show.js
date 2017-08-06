module.exports = function(router){

	var yelp = require('yelp-fusion'),
	clientId=process.env.CLIENT_ID,
	clientSecret=process.env.CLIENT_SECRET;

	router.route('/reviews/reviews-show/:biz_id')
		.get(function(req, res){

			var bizID = req.params.biz_id;

			yelp.accessToken(clientId, clientSecret).then(response => {
				const client = yelp.client(response.jsonBody.access_token);
					client.reviews(bizID).then(response => {
					  console.log(response.jsonBody.reviews);
					  var reviews = response.jsonBody.reviews
					  res.send({reviews:reviews})
					}).catch(e => {
					  console.log(e);
				});
			})
		});
}