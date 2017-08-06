module.exports = function(router){

	// ROUTE: "/"
  require("./controllers/index.js")(router);

  // ROUTE: "/search/search-results"
  require("./controllers/search/search-results.js")(router);

  // ROUTE: "/reviews/reviews-show"
  require("./controllers/reviews/reviews-show.js")(router);

  return router

}